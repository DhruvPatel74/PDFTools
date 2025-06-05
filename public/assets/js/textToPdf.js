document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("text-to-pdf");
    const fileInput = document.getElementById("text-upload");
    const convertButton = document.getElementById("text-to-pdf-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    convertButton.addEventListener("click", async function () {
        const file = fileInput.files[0];

        if (!file) {
            alert("Please upload a text file.");
            return;
        }

        // Show loading overlay
        loadingOverlay.classList.remove("d-none");

        const formData = new FormData();
        formData.append("textFile", file);

        try {
            const response = await fetch("/api/texttopdf", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to convert text to PDF.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Show result section and set download link
            resultSection.classList.remove("d-none");
            downloadLink.href = url;
            downloadLink.download = "converted.pdf";
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while converting the text file to PDF.");
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.add("d-none");
        }
    });
});
