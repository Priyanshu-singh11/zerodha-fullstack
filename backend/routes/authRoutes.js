const express = require("express");

const signup = require("../controllers/signup");
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const logoutAll = require('../controllers/logoutAll')
const verifyUser = require("../controllers/verifyUser");
const verifyOtp = require("../controllers/verifyOtp");
const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");
const refreshToken = require("../controllers/refreshToken");

const authLimiter = require("../middleware/authLimiter");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/verify-otp", authLimiter, verifyOtp);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.post("/logout", authMiddleware, logout);
router.post("/logoutAll", authMiddleware, logoutAll);
router.post("/refresh-token", refreshToken);
router.get("/verify", verifyUser);


router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;