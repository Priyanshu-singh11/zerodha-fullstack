const jwt = require("jsonwebtoken");
const Usermodel = require("../model/Usermodel");

const authMiddleware = async (req, res, next) => {
  try {
  
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no token",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await Usermodel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("authMiddleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

module.exports = authMiddleware;
