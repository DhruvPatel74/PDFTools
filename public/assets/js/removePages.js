document.getElementById("remove-pages-pdf-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("remove-pages-pdf-file");
    const pageRangeInput = document.getElementById("remove-pages-pdf-page-range");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (fileInput.files.length === 0) {
        showDangerAlert("Please select a PDF file to remove pages from.");
        return;
    }

    const file = fileInput.files[0];
    const pageRange = pageRangeInput.value.trim(); // Example: "2,4-6"

    if (!pageRange) {
        showDangerAlert("Please specify pages to remove.");
        return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("pageRange", pageRange);

    // Show loading overlay
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/removePages", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            setTimeout(() => {
                downloadLink.href = result.downloadUrl;
                downloadLink.download = "updated.pdf";
                resultSection.classList.remove("d-none"); // Show download section

                // Hide loading overlay
                loadingOverlay.classList.add("d-none");

                showSuccessAlert("Your updated PDF is ready to download!");
            }, 3000); // Simulated delay for better UX
        } else {
            showDangerAlert(result.error || "Error removing pages from the PDF.");
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
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger alert-dismissible fade show";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.remove("show");
        alertDiv.classList.add("hide");
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}

function showSuccessAlert(message) {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.remove("show");
        alertDiv.classList.add("hide");
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}
