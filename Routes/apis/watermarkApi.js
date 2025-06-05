const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, degrees, StandardFonts } = require("pdf-lib");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const watermarkText = req.body.watermarkText || "CONFIDENTIAL";

        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `watermarked-${Date.now()}.pdf`);

        // Read the uploaded PDF
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const pages = pdfDoc.getPages();

        pages.forEach((page) => {
            const { width, height } = page.getSize();

            // Calculate text width and height for centering
            const fontSize = 100;
            const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
            const textHeight = fontSize;

            // Position in the center of the page`
            const x = (width - textWidth) / 2;
            const y = (height - textHeight) / 2;

            page.drawText(watermarkText, {
                x,
                y,
                size: fontSize,
                font,
                color: rgb(0.6, 0.6, 0.6), // Light gray color
                rotate: degrees(45),
                opacity: 0.3, // Transparent
            });
        });

        // Save the new PDF
        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, modifiedPdfBytes);
        fs.unlinkSync(inputPath); // Remove the original file

        res.json({ downloadUrl: `/download/${path.basename(outputPath)}` });
    } catch (error) {
        console.error("❌ Error adding watermark:", error);
        res.status(500).json({ error: "An error occurred while adding the watermark." });
    }
});

module.exports = router;
