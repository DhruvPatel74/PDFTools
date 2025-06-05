const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const fetch = require("node-fetch");
const sharp = require("sharp");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Convert PDF to images
router.post("/convert", upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const pdfPath = req.file.path;
        const outputDir = path.join(__dirname, "../../converted", Date.now().toString());

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        let opts = {
            format: "png",
            out_dir: outputDir,
            out_prefix: "page",
            page: null,
        };

        await require("pdf-poppler").convert(pdfPath, opts);
        const imageFiles = fs.readdirSync(outputDir).map(file => `/converted/${path.basename(outputDir)}/${file}`);

        res.json({ images: imageFiles });
    } catch (error) {
        console.error("Error converting PDF:", error);
        res.status(500).json({ error: "Failed to convert PDF to images" });
    }
});

// Recreate PDF from modified images
router.post("/organize", async (req, res) => {
    try {
        const { images } = req.body;
        if (!images || images.length === 0) {
            return res.status(400).json({ error: "No images provided" });
        }

        const pdfDoc = await PDFDocument.create();
        
        for (const imgData of images) {
            const response = await fetch(imgData.src.startsWith("http") ? imgData.src : `http://localhost:3000${imgData.src}`);
            const imgBuffer = await response.buffer();
            
            let processedBuffer = imgBuffer;
            if (parseInt(imgData.rotation) !== 0) {
                processedBuffer = await sharp(imgBuffer).rotate(parseInt(imgData.rotation)).toBuffer();
            }
            
            const image = await pdfDoc.embedPng(processedBuffer);
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }

        const outputDir = path.join(__dirname, "../../organized");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPdfPath = path.join(outputDir, `organized_${Date.now()}.pdf`);
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPdfPath, pdfBytes);

        res.json({ pdfUrl: `/organized/${path.basename(outputPdfPath)}` }); 
    } catch (error) {
        console.error("Error organizing PDF:", error);
        res.status(500).json({ error: "Failed to recreate PDF" });
    }
});

module.exports = router;
