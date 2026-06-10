const bcrypt = require("bcryptjs");

const Usermodel = require("../model/Usermodel");
const Otpmodel = require("../model/Otpmodel");

const generateOtp = require("../utils/generateOtp");
const emailTemplates = require("../utils/emailTemplates");
const { sendEmail } = require("../services/emailService");

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    username = username?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await Usermodel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Usermodel.create({
      username,
      email,
      password: hashedPassword,
    });

    const otpData = generateOtp();

    await Otpmodel.create({
      user: user._id,
      email: user.email,
      otpHash: otpData.otpHash,
      purpose: "email_verification",
      expiresAt: otpData.expiresAt,
    });

    // Fixed: use the named export from the updated emailTemplates
    const template = emailTemplates.verifyEmail(user.username, otpData.otp);

    await sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.html,
      text: `Your OTP is ${otpData.otp}`,
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete registration.",
      email: user.email,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = signup;