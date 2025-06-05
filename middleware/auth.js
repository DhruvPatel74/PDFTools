require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Use .env key
        if (err) {
            req.user = null;
            return next();
        }
        req.user = decoded; // Attach user data to request
        next();
    });
};

module.exports = verifyUser;
