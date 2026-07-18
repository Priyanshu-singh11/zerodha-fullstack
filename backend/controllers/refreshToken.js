const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Sessionmodel = require("../model/Sessionmodel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        refreshTokenCookie,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }


    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshTokenCookie)
      .digest("hex");

    const session = await Sessionmodel.findOne({
      user: decoded.id,
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      
      await Sessionmodel.updateMany(
        { user: decoded.id },
        { revoked: true, revokedAt: new Date() }
      );

      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    if (session.expiresAt < new Date()) {
      session.revoked = true;
      session.revokedAt = new Date();
      await session.save();

      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      sessionId: session._id,
    });
    const newRefreshToken = generateRefreshToken({
      id: decoded.id,
      sessionId: session._id,
    });

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    session.lastUsedAt = new Date();
    await session.save();

    // Set both new cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed",
    });
  } catch (error) {
    console.error("refreshToken error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = refreshToken;
