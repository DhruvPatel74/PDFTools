document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pdf-to-images-button").addEventListener("click", async () => {
        const fileInput = document.getElementById("pdf-to-images-file");
        const loadingOverlay = document.getElementById("loading-overlay");
        const resultSection = document.getElementById("result-section");
        const imageContainer = document.getElementById("image-container");
        const downloadLink = document.getElementById("download-link"); 

        if (fileInput.files.length === 0) {
            showDangerAlert("Please select a PDF file.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("pdfFile", file);

        // Show loading
        loadingOverlay.classList.remove("d-none");

        try {
            const response = await fetch("/api/pdftoimage", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                imageContainer.innerHTML = ""; // Clear previous results

                result.images.forEach(imageUrl => {
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.className = "img-thumbnail m-2";
                    imgElement.style.width = "200px";
                    imageContainer.appendChild(imgElement);
                });

                // Set download link for ZIP file
                downloadLink.href = result.zipUrl;
                downloadLink.download = "converted_images.zip"; // Set filename
                downloadLink.classList.remove("d-none");

                resultSection.classList.remove("d-none");
                showSuccessAlert("PDF converted successfully! You can download the images as a ZIP file.");
            } else {
                showDangerAlert(result.error || "Error converting PDF.");
            }
        } catch (error) {
            console.error("Error:", error);
            showDangerAlert("An error occurred while processing the file.");
        } finally {
            loadingOverlay.classList.add("d-none"); // Hide loading
        }
    });

    function showDangerAlert(message) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger alert-dismissible fade show";
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.getElementById("alert-container").appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }

    function showSuccessAlert(message) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success alert-dismissible fade show";
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.getElementById("alert-container").appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }
});


