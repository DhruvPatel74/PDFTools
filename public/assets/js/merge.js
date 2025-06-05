document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("merge-file");
  const mergeButton = document.getElementById("merge-button");
  const resultSection = document.getElementById("result-section");
  const downloadLink = document.getElementById("download-link");
  const loadingOverlay = document.getElementById("loading-overlay"); // Ensure this exists in your HTML

  if (!fileInput || !mergeButton || !resultSection || !downloadLink || !loadingOverlay) {
      console.error("One or more required DOM elements are missing.");
      return;
  }

  mergeButton.addEventListener("click", async () => {
      const files = fileInput.files;
      if (files.length < 2) {
          showDangerAlert("Please select at least two PDF files to merge.");
          return;
      }

      // Show loading overlay
      loadingOverlay.classList.remove("d-none");

      try {
          const pdfDoc = await PDFLib.PDFDocument.create();

          for (const file of files) {
              const arrayBuffer = await file.arrayBuffer();
              const donorPdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
              const donorPages = await pdfDoc.copyPages(
                  donorPdfDoc,
                  donorPdfDoc.getPageIndices()
              );
              donorPages.forEach((page) => pdfDoc.addPage(page));
          }

          const mergedPdfBytes = await pdfDoc.save();
          const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);


          // Delay for 5 to 10 seconds (randomized)
          const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; // Random between 5000ms (5s) to 10000ms (10s)

          setTimeout(() => {
              downloadLink.href = url;
              downloadLink.download = "merged.pdf";

              if (resultSection.classList.contains("d-none")) {
                  resultSection.classList.remove("d-none");
                  showSuccessAlert("Download is ready!");
              }

              // Hide loading overlay
              loadingOverlay.classList.add("d-none");
          }, delayTime);

      } catch (error) {
          console.error("An error occurred during the PDF merge process:", error);
          showDangerAlert("An error occurred while merging the PDF files. Please try again.");
          loadingOverlay.classList.add("d-none"); // Hide loading overlay
      }
  });
});

// Custom Alert Functions
function showDangerAlert(message, type = "danger") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.getElementById("alert-container").appendChild(alertDiv);
  setTimeout(() => {
      alertDiv.classList.remove("show");
      alertDiv.classList.add("hide");
      setTimeout(() => alertDiv.remove(), 500);
  }, 5000);
}

function showSuccessAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.className = "alert alert-success alert-dismissible fade show";
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  document.getElementById("alert-container").appendChild(alertDiv);
  setTimeout(() => {
      alertDiv.classList.remove("show");
      alertDiv.classList.add("hide");
      setTimeout(() => alertDiv.remove(), 500);
  }, 5000);
}
