document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("unlock-pdf-button").addEventListener("click", async () => {
        const fileInput = document.getElementById("unlock-pdf-file");
        const passwordInput = document.getElementById("password");
        const loadingOverlay = document.getElementById("loading-overlay");
        const resultSection = document.getElementById("result-section");
        const downloadLink = document.getElementById("download-link");

        if (fileInput.files.length === 0 || !passwordInput.value) {
            showDangerAlert("Please select a locked PDF file and enter the correct password.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("pdfFile", file);
        formData.append("password", passwordInput.value);

        loadingOverlay.classList.remove("d-none");

        try {
            const response = await fetch("/api/pdfunlock", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to unlock PDF.");
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            downloadLink.href = downloadUrl;
            downloadLink.download = "unlocked.pdf";
            downloadLink.classList.remove("d-none");

            resultSection.classList.remove("d-none");
            showSuccessAlert("PDF unlocked successfully! You can download it now.");
        } catch (error) {
            console.error("Error:", error);
            showDangerAlert(error.message || "An error occurred while unlocking the file.");
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
