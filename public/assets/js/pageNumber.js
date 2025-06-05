document.getElementById("pdf-page-numbering-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("pdf-page-numbering-file");
    const positionInput = document.getElementById("page-number-position");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");
    const loadingOverlay = document.getElementById("loading-overlay");

    if (fileInput.files.length === 0) {
        showDangerAlert("Please select a PDF file to add page numbers.");
        return;
    }

    const file = fileInput.files[0];
    const position = positionInput.value; // Example: "bottom-center", "top-center"

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("position", position);

    // Show loading overlay
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/pagenumbers", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            // Delay for 5 to 10 seconds (randomized)
            const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

            setTimeout(() => {
                downloadLink.href = result.downloadUrl;
                downloadLink.download = "numbered-pdf.pdf";
                resultSection.classList.remove("d-none"); // Show download section

                // Hide loading overlay
                loadingOverlay.classList.add("d-none");

                showSuccessAlert("Page numbers added successfully! Download your PDF now.");
            }, delayTime);
        } else {
            showDangerAlert(result.error || "Error adding page numbers.");
            loadingOverlay.classList.add("d-none"); // Hide loading overlay
        }
    } catch (error) {
        console.error("Error:", error);
        showDangerAlert("An error occurred while processing the file.");
        loadingOverlay.classList.add("d-none"); // Hide loading overlay
    }
});

// Custom Alert Functions
function showDangerAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger alert-dismissible fade show";
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
