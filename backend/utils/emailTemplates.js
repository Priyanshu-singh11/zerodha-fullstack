/**
 * emailTemplates.js
 *
 * Exports an object with named template functions so both
 * signup.js and forgotPassword.js can import consistently:
 *
 *   const emailTemplates = require("../utils/emailTemplates");
 *   emailTemplates.verifyEmail(username, otp)
 *   emailTemplates.resetPasswordOtp({ username, otp })
 */
 // for making this  i use AI 
const baseWrapper = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="background:#f4f6f9;padding:40px;font-family:Arial,sans-serif;margin:0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.1);">
    ${content}
    <div style="background:#fafafa;padding:20px;text-align:center;font-size:13px;color:#888;">
      &copy; ${new Date().getFullYear()} Zerodha Clone
    </div>
  </div>
</body>
</html>
`;

const otpBlock = (otp) => `
<div style="margin:35px 0;text-align:center;">
  <span style="display:inline-block;padding:18px 35px;font-size:34px;font-weight:bold;
    letter-spacing:8px;background:#f5f7fb;border:2px dashed #387ed1;
    border-radius:12px;color:#387ed1;">
    ${otp}
  </span>
</div>
<p style="font-size:15px;color:#666;text-align:center;">
  This OTP will expire in <strong>5 minutes</strong>.
</p>
`;

// ── Email verification ───────────────────────────────────────────────────────
const verifyEmail = (username, otp) => {
  const subject = "Verify Your Email – Zerodha Clone";
  const html = baseWrapper(`
    <div style="background:linear-gradient(135deg,#387ed1,#2459a6);padding:35px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:28px;">Email Verification</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin-top:0;color:#222;">Hello ${username},</h2>
      <p style="font-size:16px;line-height:1.8;color:#555;">
        Thank you for registering. Please verify your email using the OTP below : 
      </p>
      ${otpBlock(otp)}
      <p style="font-size:14px;color:#999;margin-top:30px;text-align:center;">
        If you didn't create this account, please ignore this email.
      </p>
    </div>
  `);
  return { subject, html };
};

// ── Password reset ───────────────────────────────────────────────────────────
const resetPasswordOtp = ({ username, otp }) => {
  const subject = "Password Reset OTP – Zerodha Clone";
  const html = baseWrapper(`
    <div style="background:linear-gradient(135deg,#e05c5c,#b52d2d);padding:35px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:28px;">Password Reset</h1>
    </div>
    <div style="padding:40px;">
      <h2 style="margin-top:0;color:#222;">Hello ${username},</h2>
      <p style="font-size:16px;line-height:1.8;color:#555;">
        We received a request to reset your password. Use the OTP below :  
      </p>
      <h4>${otpBlock(otp)}</h4>
      <p style="font-size:14px;color:#999;margin-top:30px;text-align:center;">
        If you didn't request this, please ignore this email. Your password won't change.
      </p>
    </div>
  `);
  return { subject, html };
};

module.exports = { verifyEmail, resetPasswordOtp };
