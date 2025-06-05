const express = require("express");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const libre = require("libreoffice-convert"); // For Word to PDF conversion

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Ensure the output directory exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

router.post("/", upload.single("wordFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `${Date.now()}.pdf`);

        // Convert Word to PDF
        const wordBuffer = fs.readFileSync(inputPath);
        libre.convert(wordBuffer, ".pdf", undefined, (err, pdfBuffer) => {
            if (err) {
                console.error("Error converting Word to PDF:", err);
                return res.status(500).json({ error: "Conversion failed." });
            }

            fs.writeFileSync(outputPath, pdfBuffer);
            
            // Send file for download
            res.download(outputPath, "converted.pdf", (err) => {
                if (err) console.error("Download error:", err);

                // Cleanup
                fs.unlinkSync(outputPath);
                fs.unlinkSync(inputPath);
            });
        });

    } catch (error) {
        console.error("Error processing Word to PDF:", error);
        res.status(500).json({ error: "Failed to process file." });
    }
});

module.exports = router;
