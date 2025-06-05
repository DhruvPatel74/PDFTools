document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("compress-pdf-file");
    const compressButton = document.getElementById("compress-pdf-button");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");
    const loadingOverlay = document.getElementById("loading-overlay");

    if (!fileInput || !compressButton || !resultSection || !downloadLink || !loadingOverlay) {
        console.error("One or more required DOM elements are missing.");
        return;
    }

    compressButton.addEventListener("click", async () => {
        const files = fileInput.files;
        if (files.length === 0) {
            showDangerAlert("Please select a PDF file to compress.");
            return;
        }

        // Show loading overlay
        loadingOverlay.classList.remove("d-none");

        try {
            const formData = new FormData();
            formData.append("file", files[0]);

            // Call the backend API
            const response = await fetch('/api/compress', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to compress PDF');
            }

            // Convert the response to a Blob
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Delay for 5 to 10 seconds (randomized)
            const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            setTimeout(() => {
                downloadLink.href = url;
                downloadLink.download = "compressed.pdf";

                if (resultSection.classList.contains("d-none")) {
                    resultSection.classList.remove("d-none");
                    showSuccessAlert("Download is ready!");
                }

                // Hide loading overlay
                loadingOverlay.classList.add("d-none");
            }, delayTime);

        } catch (error) {
            console.error("An error occurred during PDF compression:", error);
            showDangerAlert("An error occurred while compressing the PDF. Please try again.");
            loadingOverlay.classList.add("d-none"); // Hide loading overlay
        }
    });
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