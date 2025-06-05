document.getElementById("pdf-to-excel-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("pdf-to-excel-file");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (fileInput.files.length === 0) {
        showDangerAlert("danger", "Please select a PDF file to convert.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("pdfFile", file);

    // Show loading overlay
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/pdftoexcel", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error converting the PDF.");
        }

        // Convert response to Blob (Excel file)
        const blob = await response.blob();
        const fileURL = window.URL.createObjectURL(blob);

        // Show the download link after processing
        setTimeout(() => {
            downloadLink.href = fileURL;
            downloadLink.download = "converted.xlsx";
            resultSection.classList.remove("d-none"); // Show download section

            // Hide loading overlay
            loadingOverlay.classList.add("d-none");

            showSuccessAlert("success", "Download is ready!");
        }, 5000);

    } catch (error) {
        console.error("Error:", error);
        showDangerAlert("danger", "An error occurred while processing the file.");
        loadingOverlay.classList.add("d-none");
    }
});

function showDangerAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-danger alert-dismissible fade show`;
    alertDiv.role = "alert";
    alertDiv.innerHTML = `${message} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.getElementById("alert-container").appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

function showSuccessAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.role = "alert";
    alertDiv.innerHTML = `${message} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.getElementById("alert-container").appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}
