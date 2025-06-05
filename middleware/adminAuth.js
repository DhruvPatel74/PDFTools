// middlewares/isAdmin.js
function isAdmin(req, res, next) {
    // Check if user is authenticated
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    // Check if user has admin role
    if (req.user.role === 'admin') {
        return next();
    }

    // If logged in but not admin, redirect to homepage or unauthorized page
    return res.redirect('/');
}

module.exports = isAdmin;