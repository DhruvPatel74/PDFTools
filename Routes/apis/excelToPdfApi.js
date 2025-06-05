const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.xlsx`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
      return cb(new Error("Only Excel files are allowed"), false);
    }
    cb(null, true);
  },
});

// Ensure output directory exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert Excel to PDF in Table Format with heading recognition
const convertExcelToPDF = async (excelPath, pdfPath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);
  const worksheet = workbook.worksheets[0];

  const doc = new PDFDocument({ margin: 30, size: "A4", layout: "portrait" });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const maxColsPerPage = 5; // Number of columns that fit on one page
  const numColumns = worksheet.getRow(1).cellCount;
  const numPages = Math.ceil(numColumns / maxColsPerPage);
  const rowHeight = 30; // Base row height

  // Loop through column groups (pages for wide tables)
  for (let page = 0; page < numPages; page++) {
    if (page > 0) doc.addPage(); // New PDF page for extra column groups

    let startCol = page * maxColsPerPage + 1;
    let endCol = Math.min(startCol + maxColsPerPage - 1, numColumns);
    let tableY = 80;

    const colWidth = pageWidth / (endCol - startCol + 1);

    // Draw table header (first row)
    worksheet.getRow(1).eachCell((cell, colIndex) => {
      if (colIndex < startCol || colIndex > endCol) return;
      doc.rect(30 + (colIndex - startCol) * colWidth, tableY, colWidth, rowHeight).stroke();
      doc.text(cell.value ? cell.value.toString() : "", 35 + (colIndex - startCol) * colWidth, tableY + 8, {
        width: colWidth - 10,
        align: "center",
      });
    });

    tableY += rowHeight;
    // Set default font for regular rows
    doc.fontSize(10).font("Helvetica");

    // Draw table rows
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Skip header row

      // Determine if this row is a heading.
      // Here we check the first cell in the current column group.
      let cellToCheck = row.getCell(startCol);
      let isHeadingRow = cellToCheck && cellToCheck.font && cellToCheck.font.bold;

      // Set font based on heading status
      if (isHeadingRow) {
        doc.fontSize(14).font("Helvetica-Bold");
      } else {
        doc.fontSize(10).font("Helvetica");
      }

      // Calculate maximum line count for the current row
      let maxLineCount = 1;
      row.eachCell((cell, colIndex) => {
        if (colIndex < startCol || colIndex > endCol) return;
        const text = cell.value ? cell.value.toString() : "";
        const lines = doc.heightOfString(text, { width: colWidth - 10 }) / 12;
        maxLineCount = Math.max(maxLineCount, Math.ceil(lines));
      });

      // Adjust row height: use a larger factor for heading rows
      const adjustedRowHeight = maxLineCount * (isHeadingRow ? 20 : 15);

      // If heading row, fill background to visually mark it
      if (isHeadingRow) {
        for (let colIndex = startCol; colIndex <= endCol; colIndex++) {
          doc
            .rect(30 + (colIndex - startCol) * colWidth, tableY, colWidth, adjustedRowHeight)
            .fillOpacity(0.2)
            .fillAndStroke("#D9D9D9", "black");
        }
        // Reset fill opacity for subsequent text
        doc.fillOpacity(1);
      } else {
        // Draw cell borders for regular rows
        row.eachCell((cell, colIndex) => {
          if (colIndex < startCol || colIndex > endCol) return;
          doc.rect(30 + (colIndex - startCol) * colWidth, tableY, colWidth, adjustedRowHeight).stroke();
        });
      }

      // Draw cell text
      row.eachCell((cell, colIndex) => {
        if (colIndex < startCol || colIndex > endCol) return;
        doc.text(cell.value ? cell.value.toString() : "", 35 + (colIndex - startCol) * colWidth, tableY + 5, {
          width: colWidth - 10,
          align: "center",
        });
      });

      tableY += adjustedRowHeight;

      // If table reaches page bottom, add a new page
      if (tableY + adjustedRowHeight > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        tableY = 80;
      }
    });
  }

  doc.end();
  return new Promise((resolve) => stream.on("finish", resolve));
};

// API Route to handle Excel upload and conversion
router.post("/", upload.single("excelFile"), async (req, res) => {
  try {
    const inputPath = path.join(__dirname, "../../uploads", req.file.filename);
    const outputPdfPath = path.join(outputDir, `${Date.now()}_converted.pdf`);

    // Convert Excel to PDF with heading recognition
    await convertExcelToPDF(inputPath, outputPdfPath);

    // Send the PDF file for download and then clean up files
    res.download(outputPdfPath, "converted.pdf", (err) => {
      if (err) console.error("Download error:", err);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPdfPath);
    });
  } catch (error) {
    console.error("Error processing Excel:", error.message);
    res.status(500).json({ error: "Failed to process file." });
  }
});

module.exports = router;
