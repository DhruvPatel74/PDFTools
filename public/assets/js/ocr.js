    document.getElementById("pdf-ocr-button").addEventListener("click", async () => {
        const fileInput = document.getElementById("pdf-ocr-file");
        const loadingOverlay = document.getElementById("loading-overlay");
        const resultSection = document.getElementById("result-section");
        const downloadLink = document.getElementById("download-link");
    
        if (fileInput.files.length === 0) {
            showDangerAlert("Please select a PDF file for OCR.");
            return;
        }
    
        const formData = new FormData();
        formData.append("pdfFile", fileInput.files[0]);
    
        loadingOverlay.classList.remove("d-none");
    
        try {
            const response = await fetch("/api/ocr", {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
    
            if (response.ok) {
                setTimeout(() => {
                    downloadLink.href = result.downloadUrl;
                    downloadLink.download = "ocr-text.txt";
                    resultSection.classList.remove("d-none");
                    loadingOverlay.classList.add("d-none");
                    showSuccessAlert("Text extraction complete!");
                }, 5000);
            } else {
                showDangerAlert(result.error || "OCR failed.");
                loadingOverlay.classList.add("d-none");
            }
        } catch (error) {
            console.error("Error:", error);
            showDangerAlert("An error occurred during OCR.");
            loadingOverlay.classList.add("d-none");
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
