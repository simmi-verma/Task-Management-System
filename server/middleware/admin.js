module.exports = function (req, res, next) {
  // 'req.user' is populated by your existing 'auth' middleware
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed to the route
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};