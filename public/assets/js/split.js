document.getElementById("split-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("split-file");
    const pageRangeInput = document.getElementById("split-page-range");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (fileInput.files.length === 0) {
        showDangerAlert("Please select a PDF file to split.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("pageRange", pageRangeInput.value.trim());

    // Show loading overlay
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/split", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {

            // Delay for 5 to 10 seconds (randomized)
            const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; // Random between 5000ms (5s) to 10000ms (10s)

            setTimeout(() => {
                downloadLink.href = result.downloadUrl;
                downloadLink.download = "split.pdf";
                resultSection.classList.remove("d-none"); // Show the download section

                // Hide loading overlay
                loadingOverlay.classList.add("d-none");

                showSuccessAlert("Download is ready!");
            }, delayTime);
        } else {
            showDangerAlert(result.error || "Error splitting the PDF.");
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
