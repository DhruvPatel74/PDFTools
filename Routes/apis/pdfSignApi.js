const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Ensure directories exist
const uploadDir = path.join(__dirname, "../../uploads");
const outputDir = path.join(__dirname, "../../outputs");

[uploadDir, outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `upload_${uuidv4()}.pdf`);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("pdfFile"), async (req, res) => {
    let tempFiles = [];

    console.log("POST /api/pdfsign hit");

    try {
        if (!req.file) {
            console.error("❌ No PDF file uploaded.");
            return res.status(400).json({ error: "No PDF file uploaded." });
        }

        console.log("✅ PDF uploaded:", req.file.path);
        tempFiles.push(req.file.path);

        const signatureData = JSON.parse(req.body.signatureData);
        console.log("✅ Signature data received");

        if (!signatureData || !signatureData.signature || !signatureData.pages) {
            console.error("❌ Invalid signature data.");
            return res.status(400).json({ error: "Invalid signature data." });
        }

        // Save signature image
        const signaturePath = path.join(outputDir, `signature_${uuidv4()}.png`);
        const base64Data = signatureData.signature.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(signaturePath, base64Data, "base64");
        console.log("✅ Signature image saved at:", signaturePath);
        tempFiles.push(signaturePath);

        // Generate output path
        const outputPdfPath = path.join(outputDir, `signed_${uuidv4()}.pdf`);
        console.log("📄 Output path for signed PDF:", outputPdfPath);
        tempFiles.push(outputPdfPath);

        // Save pages data to JSON file
        const pagesData = {
            signaturePath: signaturePath,
            pages: signatureData.pages.map(page => ({
                page: page.page,
                x: page.signature.x,
                y: page.signature.y,
                width: page.signature.width,
                height: page.signature.height
            }))
        };

        const pagesDataPath = path.join(outputDir, `pages_${uuidv4()}.json`);
        fs.writeFileSync(pagesDataPath, JSON.stringify(pagesData));
        console.log("📝 Pages data saved at:", pagesDataPath);
        tempFiles.push(pagesDataPath);

        // Execute Python script
        const pythonScript = path.join(__dirname, "pdfSign.py");
        const command = `python "${pythonScript}" "${req.file.path}" "${pagesDataPath}" "${outputPdfPath}"`;

        console.log("🚀 Running command:", command);

        exec(command, (error, stdout, stderr) => {
            console.log("📤 Python stdout:", stdout);
            console.error("🐍 Python stderr:", stderr);

            // Cleanup temporary files
            if (!process.env.KEEP_TEMP_FILES) {
                tempFiles.forEach(file => {
                    if (file !== outputPdfPath && fs.existsSync(file)) {
                        fs.unlinkSync(file);
                        console.log("🧹 Deleted temp file:", file);
                    }
                });
            }

            if (error) {
                console.error("❌ Python execution error:", error);
                return res.status(500).json({
                    error: "Error signing PDF",
                    details: stderr || error.message
                });
            }

            if (fs.existsSync(outputPdfPath)) {
                console.log("✅ Signed PDF ready:", outputPdfPath);
                res.download(outputPdfPath, `signed_${Date.now()}.pdf`, (err) => {
                    if (!process.env.KEEP_TEMP_FILES && fs.existsSync(outputPdfPath)) {
                        fs.unlinkSync(outputPdfPath);
                        console.log("🧹 Deleted signed PDF after download");
                    }
                    if (err) {
                        console.error("📥 Download error:", err);
                    }
                });
            } else {
                console.error("❌ Signed PDF not found");
                res.status(500).json({ error: "Signed PDF not generated." });
            }
        });
    } catch (error) {
        if (!process.env.KEEP_TEMP_FILES) {
            tempFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                    console.log("🧹 Deleted temp file during error:", file);
                }
            });
        }

        console.error("🔥 Internal Server Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});


module.exports = router;