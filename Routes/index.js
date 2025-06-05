const express = require("express");
const router = express.Router();
const toolsData = require("../data/toolData");
const homeData = require("../data/homeData");
const authMiddleware = require("../middleware/auth");
const { router: reviewRouter, Review } = require("./reviewRoute");
const Tool = require('../model/tools'); // Import the Tool model


// Use reviewRouter for review-related routes
router.use(reviewRouter);

// Home Page
router.get("/", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(6); // Fetch latest 5 reviews

    res.render("index", {
      user: req.user,
      title: "Every tool you need to work with PDFs in one place",
      description:
        "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock, and watermark PDFs with just a few clicks.",
      tools: homeData.hometools,
      steps: homeData.steps,
      features: homeData.features,
      qna: homeData.qna,
      trustedSoftware: homeData.trustedSoftware,
      year: currentYear,
      convertLinks: homeData.convertLinks,
      script: homeData.script,
      reviews, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching reviews");
  }
});

// Route to render the 'allTools.ejs' page
router.get("/alltools", async (req, res) => {
  try {
    const alltools = await Tool.find(); // Fetch from DB
    const currentYear = new Date().getFullYear();

    res.render("allTools", {
      alltools,
      user: req.user,
      year: currentYear,
    });
  } catch (err) {
    console.error("Failed to fetch tools:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Handle routes for each tool (split, merge)
router.get("/:tool", async (req, res) => {
  const toolName = req.params.tool;
  const tool = toolsData[toolName];

  if (!tool) {
    return res.status(404).send("Tool not found");
  }

  const currentYear = new Date().getFullYear();

  try {
    await Tool.findOneAndUpdate(
      { id: toolName }, // assuming 'id' is the tool identifier in DB
      { $inc: { usageCount: 1 } }
    );
  } catch (error) {
    console.error("Failed to update usage count:", error);
  }


  // Render the layout with dynamic data
  res.render("toolPageLayout", {
    user: req.user,
    title: tool.title,
    description: tool.description,
    tool: tool,
    steps: tool.steps,
    features: tool.features,
    year: currentYear,
    page: toolName,
  });
});


module.exports = router;
