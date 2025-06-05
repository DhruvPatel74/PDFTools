document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("organize-pdf-file");
  const organizeBtn = document.getElementById("organize-btn");
  const downloadLink = document.getElementById("download-link");
  const organizeSection = document.getElementById("organize-section");
  const resultSection = document.getElementById("result-section");
  const organizeContainer = document.getElementById("organize-container");
  const loadingOverlay = document.getElementById("loading-overlay");

  document
    .getElementById("organize-pdf-button")
    .addEventListener("click", async () => {
      if (!fileInput || fileInput.files.length === 0) {
        alert("Please select a PDF file.");
        return;
      }

      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("pdfFile", file);
      loadingOverlay.classList.remove("d-none");

      try {
        const response = await fetch("/api/pdfOrganizer/convert", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        loadingOverlay.classList.add("d-none");

        if (response.ok) {
          organizeContainer.innerHTML = ""; // Clear previous images
          result.images.forEach((imageUrl, index) => {
            const div = document.createElement("div");
            div.className = "image-wrapper";
            div.dataset.index = index;
            div.dataset.rotation = "0";
            div.draggable = true; // Enable dragging

            const img = document.createElement("img");
            img.src = imageUrl;
            img.className = "img-thumbnail m-2";
            img.style.width = "200px";
            img.style.transition = "transform 0.3s";

            // Rotate Button
            const rotateBtn = document.createElement("button");
            rotateBtn.innerText = "Rotate";
            rotateBtn.className = "btn btn-warning btn-sm mx-1";
            rotateBtn.onclick = () => rotateImage(div);

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.className = "btn btn-danger btn-sm";
            deleteBtn.onclick = () => div.remove();

            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "buttons-container";
            buttonsContainer.appendChild(rotateBtn);
            buttonsContainer.appendChild(deleteBtn);

            div.appendChild(img);
            div.appendChild(buttonsContainer);
            organizeContainer.appendChild(div);
          });

          // Enable Drag & Drop Sorting
          enableDragAndDrop();

          organizeSection.classList.remove("d-none");
        } else {
          alert(result.error || "Error converting PDF.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the file.");
      }
    });

  // Drag and Drop Sorting
  function enableDragAndDrop() {
    new Sortable(document.getElementById("organize-container"), {
      animation: 150,
      ghostClass: "dragging",
      onEnd: function (evt) {
        console.log(`Moved page from ${evt.oldIndex} to ${evt.newIndex}`);
      },
    });
  }

  // Rotate Image Function
  function rotateImage(div) {
    let rotation = parseInt(div.dataset.rotation || "0");
    rotation += 90;
    div.dataset.rotation = rotation;

    const img = div.querySelector("img");
    img.style.transition = "transform 0.3s ease-in-out";
    img.style.transformOrigin = "center center";
    img.style.transform = `rotate(${rotation}deg)`;

    console.log(`Rotated to ${rotation} degrees`);
  }

  // Organize PDF
  organizeBtn.addEventListener("click", async () => {
    console.log("Organize button clicked!");

    const images = Array.from(
      organizeContainer.querySelectorAll(".image-wrapper")
    ).map((div) => ({
      src: div.querySelector("img").src,
      rotation: div.dataset.rotation || "0",
    }));

    if (images.length === 0) {
      alert("No pages selected for organization.");
      return;
    }

    try {
      const response = await fetch("/api/pdfOrganizer/organize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      });

      console.log("API Response:", response);
      const result = await response.json();
      console.log("API Result:", result);

      if (response.ok) {
        console.log("PDF Organized Successfully!");

        const fullUrl = `http://localhost:3000${result.pdfUrl}`; // Make sure this is correctly formatted
        downloadLink.href = fullUrl;
        downloadLink.classList.remove("d-none");
        downloadLink.innerText = "Download Organized PDF";
        downloadLink.setAttribute("download", "organized.pdf");

        resultSection.classList.remove("d-none"); // Show result section
        console.log(`Download link set to: ${fullUrl}`);
      } else {
        console.error("Error Response:", result);
        alert(result.error || "Error organizing PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while organizing the PDF.");
    }
  });
});
