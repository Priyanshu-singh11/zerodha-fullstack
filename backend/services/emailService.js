const nodemailer = require("nodemailer");

let transporter;

const createTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },

    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  return transporter;
};

const verifyEmailConnection = async () => {
  try {
    const transporter = createTransporter();

    await transporter.verify();

    console.log(
      "Email server connected successfully"
    );
  } catch (error) {
    console.error(
      "Email server connection failed:",
      error.message
    );
  }
};

const sendEmail = async ({to,subject,text,html,}) => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"Zerodha Clone" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(
      "Email Sending Error:",
      error.message
    );

    throw new Error(
      "Failed to send email"
    );
  }
};

module.exports = {
  sendEmail,
  verifyEmailConnection,
};