const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Handle text file upload and conversion
router.post("/", upload.single("textFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(__dirname, "../../outputs", `${Date.now()}.pdf`);

        // Read the text file content
        const textContent = fs.readFileSync(inputPath, "utf-8");

        // Convert text content to HTML format for PDF rendering
        const htmlContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    p { font-size: 14px; line-height: 1.6; }
                </style>
            </head>
            <body>
                <p>${textContent.replace(/\n/g, "<br>")}</p>
            </body>
            </html>
        `;

        // Generate PDF using Puppeteer
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        await page.pdf({ path: outputPath, format: "A4", printBackground: true });
        await browser.close();

        // Send the PDF as a response
        res.download(outputPath, "converted.pdf", (err) => {
            if (err) console.error("Download error:", err);
            fs.unlinkSync(outputPath);
            fs.unlinkSync(inputPath);
        });

    } catch (error) {
        console.error("Processing error:", error);
        res.status(500).json({ error: "Failed to process file." });
    }
});

module.exports = router;
