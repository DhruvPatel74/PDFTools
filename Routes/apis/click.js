const express = require('express');
const router = express.Router();
const Tool = require('../../model/tools'); // Assuming the model is saved in models/Tool.js

// POST route to handle tool click recording
router.post('/', async (req, res) => {
    const { toolId } = req.body;  // The toolId sent from the frontend

    try {
        const tool = await Tool.findOne({ id: toolId });
        console.log("Received toolId:", toolId);  // 👈 Add this line


        if (tool) {
            // Increment the usage count of the tool
            tool.usageCount += 1;
            await tool.save();

            // Send success response
            return res.status(200).json({ message: 'Click recorded' });
        } else {
            return res.status(404).json({ message: 'Tool not found' });
        }
    } catch (error) {
        console.error('Error recording tool click:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
