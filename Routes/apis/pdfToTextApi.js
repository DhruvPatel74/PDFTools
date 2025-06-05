const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Ensure the 'outputs' directory exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Handle PDF to Text Extraction
router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        
        const data = await pdfParse(fileBuffer);
        const text = data.text;

        const outputFilePath = path.join(outputDir, `extracted-${Date.now()}.txt`);
        fs.writeFileSync(outputFilePath, text, "utf8");
        fs.unlinkSync(filePath);

        res.json({ downloadUrl: `/download/${path.basename(outputFilePath)}` });
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        res.status(500).json({ error: "An error occurred while processing the PDF." });
    }
});

module.exports = router;
