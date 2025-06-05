const express = require("express");
const { chromium } = require("playwright");
const fs = require("fs");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required." });
        }

        console.log("Generating PDF using Playwright for URL:", url);

        // Launch Playwright
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox'],
        });

        const page = await browser.newPage();
        
        // Load page
        await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20mm", bottom: "20mm", left: "10mm", right: "10mm" },
        });

        await browser.close();

        // Send the PDF response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error processing URL:", error);
        res.status(500).json({ error: "Failed to convert URL to PDF.", details: error.message });
    }
});

module.exports = router;
