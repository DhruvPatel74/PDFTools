const express = require("express");
const multer = require("multer");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

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

        const position = req.body.position || "bottom-center";
        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `numbered-${Date.now()}.pdf`);

        const existingPdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();

        pages.forEach((page, index) => {
            const { width, height } = page.getSize();
            const pageNumber = `${index + 1}`;

            let x, y;

            switch (position) {
                case "bottom-left":
                    x = 50;
                    y = 30;
                    break;
                case "bottom-center":
                    x = width / 2 - 10;
                    y = 30;
                    break;
                case "bottom-right":
                    x = width - 50;
                    y = 30;
                    break;
                case "top-left":
                    x = 50;
                    y = height - 30;
                    break;
                case "top-center":
                    x = width / 2 - 10;
                    y = height - 30;
                    break;
                case "top-right":
                    x = width - 50;
                    y = height - 30;
                    break;
                default:
                    x = width / 2 - 10;
                    y = 30;
            }

            page.drawText(pageNumber, {
                x,
                y,
                size: 12,
                color: rgb(0, 0, 0),
                opacity: 0.8,
            });
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, pdfBytes);
        fs.unlinkSync(inputPath);

        res.json({ downloadUrl: `/download/${path.basename(outputPath)}` });
    } catch (error) {
        console.error("❌ Error adding page numbers:", error);
        res.status(500).json({ error: "An error occurred while adding page numbers." });
    }
});

module.exports = router;
