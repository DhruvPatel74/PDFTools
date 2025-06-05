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

        const pageRange = req.body.pageRange.trim();
        if (!pageRange) {
            return res.status(400).json({ error: "Page range is required." });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `updated-${Date.now()}.pdf`);

        // Load the existing PDF
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // Validate and parse the page range
        const pagesToRemove = parsePageRange(pageRange, totalPages);
        if (pagesToRemove.length === 0) {
            fs.unlinkSync(inputPath);
            return res.status(400).json({ error: `Invalid page range! Your PDF has only ${totalPages} pages.` });
        }

        // Create a new PDF and copy only the pages that are not removed
        const newPdf = await PDFDocument.create();
        const pagesToKeep = [...Array(totalPages).keys()].filter((i) => !pagesToRemove.includes(i + 1));

        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToKeep);
        copiedPages.forEach((page) => newPdf.addPage(page));

        // Save the new PDF
        const newPdfBytes = await newPdf.save();
        fs.writeFileSync(outputPath, newPdfBytes);

        fs.unlinkSync(inputPath); // Remove original file

        res.json({ downloadUrl: `/download/${path.basename(outputPath)}` });
    } catch (error) {
        console.error("❌ Error removing pages from PDF:", error);
        res.status(500).json({ error: "An error occurred while processing the PDF." });
    }
});

// ✅ Helper Function to Parse and Validate Page Ranges
function parsePageRange(range, totalPages) {
    const pages = new Set();
    const parts = range.split(/[, ]+/);

    for (let part of parts) {
        if (/^\d+$/.test(part)) {
            const pageNum = parseInt(part, 10);
            if (pageNum >= 1 && pageNum <= totalPages) {
                pages.add(pageNum);
            }
        } else if (/^\d+-\d+$/.test(part)) {
            const [start, end] = part.split("-").map(Number);
            if (start >= 1 && end <= totalPages && start <= end) {
                for (let i = start; i <= end; i++) {
                    pages.add(i);
                }
            }
        }
    }
    return Array.from(pages).sort((a, b) => a - b);
}

module.exports = router;
