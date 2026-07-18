const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Usermodel = require("../model/Usermodel");
const Otpmodel = require("../model/Otpmodel"); 

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // use crypto for fast otp generation
    const otpHash = crypto
      .createHash("sha256")
      .update(otp.trim())
      .digest("hex");

    const otpDoc = await Otpmodel.findOne({
      email: email.toLowerCase(),
      otpHash,
      purpose: "password_reset",
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

    user.password = await bcrypt.hash(password, 12);
    user.passwordChangedAt = new Date();
    await user.save();

    await Otpmodel.deleteMany({
      user: user._id,
      purpose: "password_reset",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("resetPassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = resetPassword;
