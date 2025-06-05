const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

// Configure multer for file uploads
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

// API Route for PDF to PPT conversion
router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded." });

        const inputPath = path.join(__dirname, "../../uploads", req.file.filename);
        const outputPptPath = path.join(outputDir, `${Date.now()}_converted.pptx`);

        // Execute the Python script
        const pythonScriptPath = path.join(__dirname, "pdf_to_ppt.py");
        const command = `python ${pythonScriptPath} ${inputPath} ${outputPptPath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error.message}`);
                console.error(`Python script stderr: ${stderr}`);
                return res.status(500).json({ error: "Failed to process file." });
            }

            // Send the converted PPT file as a response
            res.setHeader("Content-Disposition", "attachment; filename=converted.pptx");
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            res.sendFile(outputPptPath, (err) => {
                if (err) {
                    console.error("Download error:", err);
                    res.status(500).json({ error: "Failed to download file." });
                }
                // Clean up files
                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPptPath);
            });
        });
    } catch (error) {
        console.error("Error processing PDF:", error.message);
        res.status(500).json({ error: "Failed to process file." });
    }
});

module.exports = router;
