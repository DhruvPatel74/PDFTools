document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("protect-pdf-button").addEventListener("click", async () => {
        const fileInput = document.getElementById("protect-pdf-file");
        const passwordInput = document.getElementById("protect-password");
        const loadingOverlay = document.getElementById("loading-overlay");
        const resultSection = document.getElementById("result-section");
        const downloadLink = document.getElementById("download-link");

        if (fileInput.files.length === 0 || !passwordInput.value) {
            showDangerAlert("Please select a PDF file and enter a password.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("pdfFile", file);
        formData.append("password", passwordInput.value);

        loadingOverlay.classList.remove("d-none");

        try {``
            const response = await fetch("/api/pdflock", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to protect PDF.");
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            downloadLink.href = downloadUrl;
            downloadLink.download = "protected.pdf";
            downloadLink.classList.remove("d-none");

            resultSection.classList.remove("d-none");
            showSuccessAlert("PDF protected successfully! You can download it now.");
        } catch (error) {
            console.error("Error:", error);
            showDangerAlert(error.message || "An error occurred while processing the file.");
        } finally {
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