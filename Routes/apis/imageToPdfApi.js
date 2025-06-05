const express = require("express");
const multer = require("multer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const outputDir = path.join(__dirname, "../../outputs");

// Ensure the `outputs`  directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

router.post("/", upload.array("images"), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded." });
        }

        const doc = new PDFDocument({ autoFirstPage: false });
        const pdfPath = path.join(outputDir, "converted.pdf");
        const writeStream = fs.createWriteStream(pdfPath);

        doc.pipe(writeStream);

        for (const file of req.files) {
            const imagePath = file.path;
            const img = doc.openImage(imagePath);
            doc.addPage({ size: [img.width, img.height] }).image(img, 0, 0);
        }

        doc.end();

        writeStream.on("finish", () => {
            res.download(pdfPath, "converted.pdf", (err) => {
                if (err) console.error("Download error:", err);
                fs.unlinkSync(pdfPath);
                req.files.forEach(file => fs.unlinkSync(file.path));
            });
        });
    } catch (error) {
        console.error("Error processing images to PDF:", error);
        res.status(500).json({ error: "Failed to process images." });
    }
});

module.exports = router;
