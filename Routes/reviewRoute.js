const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Review Schema & Model
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model("Review", reviewSchema);

// Route to Handle Review Submission
router.post("/submit-review", async (req, res) => {
    try {
        const { name, image, review, rating } = req.body;
        const newReview = new Review({ name, image, review, rating });
        await newReview.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error submitting review");
    }
});

// Export the router & Review model
module.exports = { router, Review };
