const express = require("express");
const router = express.Router();
const Tool = require("../model/tools");
const User = require("../model/user");
const Content = require("../model/content");  
const isAdmin = require("../middleware/adminAuth"); // Import the isAdmin middleware      

// const isAdmin = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect("/auth/login"); // Redirect to login if not logged in
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if the user is an admin
//     if (decoded.role !== "admin") {
//       return res.redirect("/"); 
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("Error verifying token:", err);
//     res.clearCookie("token"); // Clear token if invalid
//     return res.redirect("/auth/login"); // Redirect to login if token is invalid
//   }
// };


router.get('/users',isAdmin, async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render('admin-panel/user', { users , user: req.user });
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).send('Server Error');
  }
});

// View All Tools
router.get("/tools",isAdmin, async (req, res) => {
  const tools = await Tool.find();
  res.render("admin-panel/tools/index.ejs", { tools, user: req.user });
});

// Add Tool
router.get("/tools/add",isAdmin, (req, res) => {
  res.render("admin-panel/tools/add", {tool: null });
});

router.post("/tools/add",isAdmin, async (req, res) => {
  await Tool.create(req.body);
  res.redirect("/admin/tools");
});

// Edit Tool
router.get("/tools/edit/:id",isAdmin, async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  res.render("admin-panel/tools/edit", { tool });
});

router.post("/tools/edit/:id",isAdmin, async (req, res) => {
  await Tool.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/tools");
});

// Delete Tool
router.post("/tools/delete/:id",isAdmin, async (req, res) => {
  await Tool.findByIdAndDelete(req.params.id);
  res.redirect("/admin/tools");
});

router.post("/users/delete/:id",isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users"); // Redirect to your users list page
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/contents",isAdmin, async (req, res) => {
  try {
    const tools = await Content.find(); //
    res.render("admin-panel/content.ejs", { tools, user: req.user });
  } catch (err) {
    console.error("Error fetching tools:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/contents/delete/:id",isAdmin, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.redirect("/tools/contents");
  } catch (err) {
    res.status(500).send("Failed to delete");
  }
});

router.get("/dashboard",isAdmin, async (req, res) => {
  try {
    const tools = await Tool.find({});

    const year = new Date().getFullYear();

   
    if (!tools || tools.length === 0) {
      console.error("No tools found in the database.");
    }

    res.render("admin-panel/dashboard", {
      tools,
      user: req.user,
      year,
    });
  } catch (error) {
    console.error("Failed to fetch tools for dashboard:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
