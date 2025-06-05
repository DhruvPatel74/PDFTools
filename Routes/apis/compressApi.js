const express = require('express');
const multer = require('multer');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(fileBuffer, {
            ignoreEncryption: true,
        });

        // Remove unnecessary metadata
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');

        // Optimize images (convert to JPEG with quality reduction)
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const { width, height } = page.getSize();
            const imageObjects = page.node.ImagesArray || [];

            for (let img of imageObjects) {
                if (img.image) {
                    const newImage = await pdfDoc.embedJpg(img.image.bytes, {
                        quality: 0.6, // Adjust JPEG compression
                    });
                    page.drawImage(newImage, { x: 0, y: 0, width, height });
                }
            }
        }

        // Save the compressed PDF
        const compressedPdfBytes = await pdfDoc.save({
            useObjectStreams: true, // Optimized object streams
            subsetFonts: true, // Remove unused font glyphs
        });

        // Define output path for compressed PDF
        const compressedFilePath = path.join(__dirname, 'compressed.pdf');
        fs.writeFileSync(compressedFilePath, compressedPdfBytes);

        // Send the compressed file back to the client
        res.download(compressedFilePath, 'compressed.pdf', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Error sending file.' });
            }

            // Clean up temporary files
            fs.unlinkSync(filePath);
            fs.unlinkSync(compressedFilePath);
        });

    } catch (error) {
        console.error('Error compressing PDF:', error);
        res.status(500).json({ error: 'An error occurred while compressing the PDF.' });
    }
});

module.exports = router;
