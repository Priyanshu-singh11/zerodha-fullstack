const crypto = require("crypto");

const Usermodel = require("../model/Usermodel");
const Otpmodel = require("../model/Otpmodel");
const Sessionmodel = require("../model/Sessionmodel");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(otp.trim())
      .digest("hex");

    const otpDoc = await Otpmodel.findOne({
      email: email.toLowerCase(),
      otpHash,
      purpose: "email_verification",
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      await Otpmodel.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const user = await Usermodel.findById(otpDoc.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Mark user as verified
    user.verified = true;
    await user.save();

    // Clean up OTPs
    await Otpmodel.deleteMany({
      user: user._id,
      purpose: "email_verification",
    });

    // Generate tokens
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Hash the refresh token and save session
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await Sessionmodel.create({
      user: user._id,
      refreshTokenHash,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"] || null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = verifyOtp;