const Usermodel = require("../model/Usermodel");
const Otpmodel = require("../model/Otpmodel");

const generateOtp = require("../utils/generateOtp");
const emailTemplates = require("../utils/emailTemplates");

const { sendEmail } = require("../services/emailService");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Usermodel.findOne({
      email: email?.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    await Otpmodel.deleteMany({
      user: user._id,
      purpose: "password_reset",
    });

    const otpData = generateOtp();

    await Otpmodel.create({
      user: user._id,
      email: user.email,
      otpHash: otpData.otpHash,
      purpose: "password_reset",
      expiresAt: otpData.expiresAt,
    });

    const template =
      emailTemplates.resetPasswordOtp({
        username: user.username,
        otp: otpData.otp,
      });

    await sendEmail({
      to: user.email,
      subject: template.subject,
      html: template.html,
      text: `Password reset OTP: ${otpData.otp}`,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset OTP sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = forgotPassword;