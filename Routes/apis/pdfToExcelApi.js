const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const PDFParser = require("pdf2json");

const router = express.Router();

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.pdf`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs are allowed"), false);
    }
    cb(null, true);
  },
});

// Ensure output directory exists
const outputDir = path.join(__dirname, "../../outputs");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract text from PDF and structure it in tabular format
const extractTextWithPdf2json = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.loadPDF(filePath);

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let structuredData = [];
      let currentSheetData = [];
      let currentPage = 1;

      pdfData.Pages.forEach((page) => {
        let rowMap = new Map();

        page.Texts.forEach((item) => {
          let text = decodeURIComponent(item.R[0].T).trim();
          let yPos = item.y.toFixed(2);
          let xPos = item.x.toFixed(2);

          if (!rowMap.has(yPos)) rowMap.set(yPos, new Map());
          rowMap.get(yPos).set(xPos, text);
        });

        let structuredRows = Array.from(rowMap.values()).map((colsMap) => {
          return Array.from(colsMap.entries())
            .sort((a, b) => a[0] - b[0])
            .map((col) => col[1]);
        });

        // Process structuredRows to detect headings
        structuredRows.forEach((row) => {
          if (isHeading(row)) {
            if (currentSheetData.length > 0) {
              structuredData.push({ page: currentPage, rows: currentSheetData });
            }
            currentSheetData = []; // Start a new section
          }
          currentSheetData.push(row);
        });

        currentPage++;
      });

      // Push the last batch of data
      if (currentSheetData.length > 0) {
        structuredData.push({ page: currentPage, rows: currentSheetData });
      }

      resolve(structuredData);
    });

    pdfParser.on("pdfParser_dataError", (err) => reject(err));
  });
};

// Function to detect if a row is a heading
const isHeading = (row) => {
  if (row.length < 2) return false; // Headings are usually longer than a single word

  // Check if all words are capitalized or if the row contains known keywords
  const keywords = ["DATE", "NAME", "INVOICE", "TOTAL", "REPORT", "SUMMARY", "DESCRIPTION"];
  return (
    row.every((cell) => /^[A-Z\s]+$/.test(cell) || cell.length > 5) ||
    row.some((cell) => keywords.includes(cell.toUpperCase()))
  );
};

// Function to create an Excel file with proper table formatting
const createExcelFile = async (data, outputExcelPath) => {
  const workbook = new ExcelJS.Workbook();

  data.forEach((section, index) => {
    const worksheet = workbook.addWorksheet(`Section ${index + 1}`);

    section.rows.forEach((row, rowIndex) => {
      const newRow = worksheet.addRow(row);
      if (isHeading(row)) {
        newRow.font = { bold: true, size: 14 };
        newRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D3D3D3" }, // Light Gray Background
          };
        });
      }
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        maxLength = Math.max(maxLength, cell.value ? cell.value.toString().length : 0);
      });
      column.width = maxLength + 2;
    });
  });

  await workbook.xlsx.writeFile(outputExcelPath);
};

// API Route to handle PDF upload and conversion
router.post("/", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const inputPath = path.join(__dirname, "../../uploads", req.file.filename);
    const outputExcelPath = path.join(outputDir, `${Date.now()}_converted.xlsx`);

    const extractedData = await extractTextWithPdf2json(inputPath);
    if (!extractedData.length) throw new Error("No structured data found in the PDF.");

    await createExcelFile(extractedData, outputExcelPath);

    res.download(outputExcelPath, "converted.xlsx", (err) => {
      if (err) console.error("Download error:", err);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputExcelPath);
    });
  } catch (error) {
    console.error("Error processing PDF:", error.message);
    res.status(500).json({ error: "Failed to process file." });
  }
});

module.exports = router;
