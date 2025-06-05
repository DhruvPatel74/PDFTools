const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");
const Poppler = require("pdf-poppler");
const { PDFDocument } = require("pdf-lib");


const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Ensure output folder exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const filePath = req.file.path;
        const outputFolder = path.join(outputDir, `images-${Date.now()}`);
        fs.mkdirSync(outputFolder);

        // Step 1: Convert PDF to images
        const options = {
            format: "png",
            out_dir: outputFolder,
            out_prefix: "page",
            page: null,
            dpi: 150,
        };

        await Poppler.convert(filePath, options);

        // Step 2: Read image files
        const imageFiles = fs
            .readdirSync(outputFolder)
            .filter((file) => file.endsWith(".png"))
            .map((file) => path.join(outputFolder, file))
            .sort(); // ensure page order

        // Step 3: OCR each image
        let finalText = "";

        for (const imagePath of imageFiles) {
            const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
            finalText += text + "\n\n";
            fs.unlinkSync(imagePath); // cleanup image
        }

        // Step 4: Save text file
        const textOutputPath = path.join(outputDir, `ocr-${Date.now()}.txt`);
        fs.writeFileSync(textOutputPath, finalText);

        // Cleanup
        fs.unlinkSync(filePath); // remove original uploaded PDF
        fs.rmSync(outputFolder, { recursive: true, force: true });

        res.json({ downloadUrl: `/download/${path.basename(textOutputPath)}` });

    } catch (err) {
        console.error("❌ OCR Error:", err);
        res.status(500).json({ error: "Failed to extract text from PDF." });
    }
});

module.exports = router;
