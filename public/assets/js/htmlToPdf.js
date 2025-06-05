document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("html-url");
    const convertButton = document.getElementById("html-to-pdf-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const resultSection = document.getElementById("result-section");
    const downloadLink = document.getElementById("download-link");

    if (!urlInput || !convertButton || !loadingOverlay || !resultSection || !downloadLink) {
        console.error("One or more required elements are missing in the DOM.");
        return;
    }

    convertButton.addEventListener("click", async function () {
        const url = urlInput.value.trim();

        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        loadingOverlay.classList.remove("d-none");

        const requestData = { url };

        try {
            const response = await fetch("/api/html-to-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Failed to convert URL to PDF. Server responded with ${response.status}`);
            }

            const blob = await response.blob();

            if (blob.type !== "application/pdf" || blob.size === 0) {
                throw new Error("Invalid or empty PDF response.");
            }

            const pdfUrl = window.URL.createObjectURL(blob);

            resultSection.classList.remove("d-none");
            downloadLink.href = pdfUrl;
            downloadLink.download = "converted.pdf";
            downloadLink.click(); // Automatically trigger download

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred: " + error.message);
        } finally {
            loadingOverlay.classList.add("d-none");
        }
    });
});