const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfPoppler = require("pdf-poppler");
const archiver = require("archiver");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdfFile"), async (req, res) => {
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

        await pdfPoppler.convert(pdfPath, opts);

        const imageFiles = fs.readdirSync(outputDir).map(file => file);
        const zipFilePath = `${outputDir}.zip`;

        // Create a ZIP file
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("zip", { zlib: { level: 9 } });

        archive.pipe(output);
        imageFiles.forEach(file => {
            archive.file(path.join(outputDir, file), { name: file });
        });

        await archive.finalize();

        // Send image URLs and ZIP file path in response
        res.json({
            images: imageFiles.map(file => `/converted/${path.basename(outputDir)}/${file}`),
            zipUrl: `/converted/${path.basename(outputDir)}.zip` // Correct ZIP URL
        });
    } catch (error) {
        console.error("Error converting PDF:", error);
        res.status(500).json({ error: "Failed to convert PDF to images" });
    }
});

module.exports = router;