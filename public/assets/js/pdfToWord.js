document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pdf-to-word-button").addEventListener("click", async () => {
        const fileInput = document.getElementById("pdf-to-word-file");
        const loadingOverlay = document.getElementById("loading-overlay");
        const resultSection = document.getElementById("result-section");
        const downloadLink = document.getElementById("download-link");

        if (fileInput.files.length === 0) {
            showDangerAlert("Please select a PDF file.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("pdfFile", file);

        // Show loading overlay
        loadingOverlay.classList.remove("d-none");

        try {
            const response = await fetch("/api/pdftoword", {
                method: "POST",
                body: formData,
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to convert PDF to Word.");
            }
        
            // Convert response to a blob (binary file)
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
        
            // Set download link
            downloadLink.href = downloadUrl;
            downloadLink.download = "converted_document.docx"; // Set filename
            downloadLink.classList.remove("d-none");
        
            resultSection.classList.remove("d-none");
            showSuccessAlert("PDF converted successfully! You can download the Word document.");
        } catch (error) {
            console.error("Error:", error);
            showDangerAlert(error.message || "An error occurred while processing the file.");
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.add("d-none");
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
