require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const indexRouter = require("./Routes/index");
const db = require("./config/db");
const bodyParser = require("body-parser");
const apiRouter = require("./Routes/api"); // Import api.js
const cors = require("cors"); // Allow frontend to access API
const cookieParser = require("cookie-parser");
const verifyUser = require("./middleware/auth");
const adminRoutes = require("./Routes/admin");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser()); // Ensure this is before using routes
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(verifyUser);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/auth", require("./Routes/authRoutes"));
app.use("/", indexRouter);
app.use("/admin", adminRoutes);

app.use("/api", apiRouter);
app.use("/download", express.static(path.join(__dirname, "outputs")));
app.use("/converted", express.static(path.join(__dirname, "converted")));
app.use("/organized", express.static(path.join(__dirname, "organized")));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
