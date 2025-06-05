const express = require("express");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
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

        const pageRange = req.body.pageRange;
        if (!pageRange) {
            return res.status(400).json({ error: "Page range is required." });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `extracted-${Date.now()}.pdf`);

        // Load the existing PDF
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const totalPages = pdfDoc.getPageCount();

        // Parse the page range into an array of zero-based page indices
        let pagesToExtract = new Set();
        pageRange.split(",").forEach((range) => {
            if (range.includes("-")) {
                const [start, end] = range.split("-").map(Number);
                for (let i = start; i <= end; i++) {
                    if (i > 0 && i <= totalPages) {
                        pagesToExtract.add(i - 1); // Convert to zero-based index
                    }
                }
            } else {
                const pageNum = Number(range);
                if (pageNum > 0 && pageNum <= totalPages) {
                    pagesToExtract.add(pageNum - 1); // Convert to zero-based index
                }
            }
        });

        // Create a new PDF with only the extracted pages
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, [...pagesToExtract]);
        copiedPages.forEach((page) => newPdf.addPage(page));

        // Save the new PDF
        const newPdfBytes = await newPdf.save();
        fs.writeFileSync(outputPath, newPdfBytes);

        fs.unlinkSync(inputPath); // Remove original file

        res.json({ downloadUrl: `/download/${path.basename(outputPath)}` });
    } catch (error) {
        console.error("❌ Error extracting pages from PDF:", error);
        res.status(500).json({ error: "An error occurred while processing the PDF." });
    }
});

module.exports = router;
