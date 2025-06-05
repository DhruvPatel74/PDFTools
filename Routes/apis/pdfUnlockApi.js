const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdfFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const inputPdfPath = req.file.path;
    const outputDir = path.join(__dirname, "../../outputs");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPdfPath = path.join(outputDir, `${Date.now()}_unlocked.pdf`);
    const password = req.body.password || "";

    // Execute Python script
    const command = `python "${path.join(__dirname, "pdfUnlock.py")}" "${inputPdfPath}" "${outputPdfPath}" "${password}"`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`❌ Error unlocking PDF: ${err.message}`);
            return res.status(500).json({ error: "PDF unlocking failed", details: stderr });
        }

        console.log(`✅ Python script output: ${stdout}`);

        // Send the unlocked PDF as a download response
        res.download(outputPdfPath, "unlocked.pdf", (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ error: "Failed to send unlocked PDF." });
            }
        });
    });
});

module.exports = router;
