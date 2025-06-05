document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("word-to-pdf");
    const fileInput = document.getElementById("word-upload");
    const convertButton = document.getElementById("word-to-pdf-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    convertButton.addEventListener("click", async () => {
        if (fileInput.files.length === 0) {
            alert("Please upload a Word file.");
            return;
        }

        const formData = new FormData();
        formData.append("wordFile", fileInput.files[0]);

        loadingOverlay.classList.remove("d-none"); // Show loading animation

        try {
            const response = await fetch("/api/wordtopdf", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to convert Word to PDF.");
            }

            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);

            // Show result section and set the download link
            resultSection.classList.remove("d-none");
            downloadLink.href = pdfUrl;
            downloadLink.download = "convertedword.pdf";
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            loadingOverlay.classList.add("d-none"); // Hide loading animation
        }
    });
});
