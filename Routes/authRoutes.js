const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const router = express.Router();

const blockAuthPagesIfLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
      try {
          jwt.verify(token, process.env.JWT_SECRET); // If token is valid, user is logged in
          return res.redirect("/"); // Redirect to home if already logged in
      } catch (error) {
          res.clearCookie("token"); // If token is invalid, clear it
      }
  }

  next(); // Allow access if not logged in
};

// Show Login Page
router.get("/login",blockAuthPagesIfLoggedIn, (req, res) => {
  res.render("login");
});

// Show Register Page
router.get("/register",blockAuthPagesIfLoggedIn, (req, res) => {
  res.render("register");
});

// Handle Registration
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, username, phone, password, confirmPassword, subscription, company } = req.body;

    console.log("Register form submitted:", req.body);

    if (password !== confirmPassword) {
      return res.render("register", { error: "Passwords do not match" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log("Email already exists");
      return res.render("register", { error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      fullName,
      email,
      username,
      phone,
      password: hashedPassword,
      subscription,
      company,
      role: "user"
    });

    await user.save();
    console.log("User registered successfully");

    res.redirect("/auth/login");
  } catch (err) {
    console.error("Registration Error:", err); // Full object
    res.render("register", { error: err.message || "Something went wrong" });
  }
  
});


// Handle Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true });

  if (user.role === "admin") {
      return res.redirect("/admin/dashboard"); // Redirect to admin panel
  }
  else{
      return res.redirect("/"); // Redirect to home page  
  }

});


// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;
