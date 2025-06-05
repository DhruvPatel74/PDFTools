document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("powerpoint-to-pdf-button")
    .addEventListener("click", async () => {
      const fileInput = document.getElementById("ppt-upload");
      const loadingOverlay = document.getElementById("loading-overlay");
      const resultSection = document.getElementById("result-section");
      const downloadLink = document.getElementById("download-link");

      if (fileInput.files.length === 0) {
        showDangerAlert("Please select a PowerPoint (.pptx) file.");
        return;
      }

      const file = fileInput.files[0];
      const formData = new FormData(); 
      formData.append("pptFile", file); 

      loadingOverlay.classList.remove("d-none");

      try {
        const response = await fetch("/api/ppttopdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PowerPoint to PDF.");
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        downloadLink.href = downloadUrl;
        downloadLink.download = "converted_presentation.pdf";
        downloadLink.classList.remove("d-none");

        resultSection.classList.remove("d-none");
        showSuccessAlert("PowerPoint converted successfully! Download the PDF file.");
      } catch (error) {
        console.error("Error:", error);
        showDangerAlert(error.message);
      } finally {
        loadingOverlay.classList.add("d-none");
      }
    });
});
