document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("excel-upload"); // Correct ID
    const convertButton = document.getElementById("excel-to-pdf-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    convertButton.addEventListener("click", async () => {
        if (!fileInput.files.length) {
            alert("Please select an Excel file.");
            return;
        }
 
        const formData = new FormData();
        formData.append("excelFile", fileInput.files[0]);

        loadingOverlay.classList.remove("d-none");

        try {
            const response = await fetch("/api/exceltopdf", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to convert file.");
            }

            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            downloadLink.href = pdfUrl;
            downloadLink.download = "converted.pdf";
            resultSection.classList.remove("d-none");

        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            loadingOverlay.classList.add("d-none");
        }
    });
});
