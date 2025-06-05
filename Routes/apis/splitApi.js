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

// Handle PDF Splitting
router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const pageRange = req.body.pageRange.trim();
        if (!pageRange) {
            return res.status(400).json({ error: "Page range is required." });
        }

        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);

        const pdfDoc = await PDFDocument.load(fileBuffer);
        const totalPages = pdfDoc.getPageCount();

        // Validate and parse the page range
        const pageNumbers = parsePageRange(pageRange, totalPages);
        if (pageNumbers.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: `Invalid page range! Your PDF has only ${totalPages} pages.` });
        }

        // Create a new PDF with selected pages
        const newPdfDoc = await PDFDocument.create();
        for (let pageNum of pageNumbers) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]); // Convert to zero-based index
            newPdfDoc.addPage(copiedPage);
        }

        // Save the new PDF
        const pdfBytes = await newPdfDoc.save();
        const outputFilePath = path.join(outputDir, `split-${Date.now()}.pdf`);
        fs.writeFileSync(outputFilePath, pdfBytes);
        fs.unlinkSync(filePath); // Remove original file

        res.json({ downloadUrl: `/download/${path.basename(outputFilePath)}` });
    } catch (error) {
        console.error("❌ Error splitting PDF:", error);
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
