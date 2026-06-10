const crypto = require("crypto");

const generateOtp = () => {
  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const otpHash = crypto
  .createHash("sha256")
  .update(otp.trim())
  .digest("hex");

  return {
    otp,
    otpHash,
    expiresAt: new Date(
      Date.now() + 5 * 60 * 1000
    ),
  };
};

module.exports = generateOtp;