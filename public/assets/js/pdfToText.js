document.getElementById("pdf-to-text-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("pdf-to-text-file");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (fileInput.files.length === 0) {
        showDangerAlert("Please select a PDF file to extract text from.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("pdfFile", file);

    // Show loading overlay
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/pdftotext", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            // Simulate a delay for better UX
            const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; // Random 5-10s
            
            setTimeout(() => {
                downloadLink.href = result.downloadUrl;
                downloadLink.download = "extracted-text.txt";
                resultSection.classList.remove("d-none"); // Show download section

                // Hide loading overlay
                loadingOverlay.classList.add("d-none");

                showSuccessAlert("Download is ready!");
            }, delayTime);
        } else {
            showDangerAlert(result.error || "Error extracting text from the PDF.");
            loadingOverlay.classList.add("d-none"); // Hide loading overlay
        }
    } catch (error) {
        console.error("Error:", error);
        showDangerAlert("An error occurred while processing the file.");
        loadingOverlay.classList.add("d-none"); // Hide loading overlay
    }
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
