const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET is not set in environment variables");
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("FATAL: JWT_REFRESH_SECRET is not set in environment variables");
} 

const generateAccessToken = (data) => {
  return jwt.sign(
    data,
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (data) => {
  return jwt.sign(
    data,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};