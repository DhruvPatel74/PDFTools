document.getElementById("images-to-pdf-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("image-upload");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (!fileInput.files.length) {
        showDangerAlert("Please select at least one image.");
        return;
    }

    const formData = new FormData();
    for (let file of fileInput.files) {
        formData.append("images", file);
    }

    // Show loading overlay BEFORE making the request
    loadingOverlay.classList.remove("d-none");

    try {
        const response = await fetch("/api/imagetopdf", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);

            // Delay for 5 to 10 seconds (randomized)
            const delayTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; 

            setTimeout(() => {
                // Open in a new tab
                window.open(pdfUrl, "_blank");

                // Set download attributes
                downloadLink.href = pdfUrl;
                downloadLink.download = "converted.pdf";
                resultSection.classList.remove("d-none"); // Show download section

                // Hide loading overlay AFTER delay
                loadingOverlay.classList.add("d-none");

                showSuccessAlert("Download is ready!");
            }, delayTime);
        } else {
            showDangerAlert("Error converting images to PDF.");
            loadingOverlay.classList.add("d-none"); // Hide loading overlay
        }
    } catch (error) {
        console.error("Error converting images to PDF:", error);
        showDangerAlert("An error occurred while processing the images.");
        loadingOverlay.classList.add("d-none");
    }
});
