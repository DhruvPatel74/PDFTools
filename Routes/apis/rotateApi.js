const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { PDFDocument, degrees } = require("pdf-lib");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Ensure output directory exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to parse page range like "1-3,5"
function parsePageRange(range, totalPages) {
    if (!range) return Array.from({ length: totalPages }, (_, i) => i);

    const pages = new Set();
    range.split(",").forEach(part => {
        if (part.includes("-")) {
            const [start, end] = part.split("-").map(n => parseInt(n.trim(), 10) - 1);
            for (let i = start; i <= end && i < totalPages; i++) {
                if (i >= 0) pages.add(i);
            }
        } else {
            const pageNum = parseInt(part.trim(), 10) - 1;
            if (!isNaN(pageNum) && pageNum >= 0 && pageNum < totalPages) {
                pages.add(pageNum);
            }
        }
    });
    return Array.from(pages);
}

router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const rotationAngle = parseInt(req.body.rotationAngle, 10);
        const pageRange = req.body.pageRange;

        if (![0, 90, 180, 270].includes(rotationAngle)) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: "Invalid rotation angle. Only 0, 90, 180, or 270 allowed." });
        }

        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const totalPages = pages.length;

        const pagesToRotate = parsePageRange(pageRange, totalPages);

        pagesToRotate.forEach(index => {
            const page = pages[index];
            const currentAngle = page.getRotation().angle;
            page.setRotation(degrees((currentAngle + rotationAngle) % 360));
        });

        const rotatedPdfBytes = await pdfDoc.save();

        const outputFilename = `rotated_${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputFilename);
        fs.writeFileSync(outputPath, rotatedPdfBytes);

        // Clean up uploaded temp file
        fs.unlinkSync(filePath);
        res.json({ downloadUrl: `/download/${path.basename(outputPath)}` });


    } catch (err) {
        console.error("Rotation Error:", err);
        res.status(500).json({ error: "Failed to rotate PDF." });
    }
});

module.exports = router;
