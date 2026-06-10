const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Usermodel = require("../model/Usermodel");
const Sessionmodel = require("../model/Sessionmodel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const verifyUser = async (req, res) => {
  try {
    const accessToken  = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // ── Case 1: accessToken present ─────────────────────────────────────────
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        // Select ONLY the fields the frontend needs — username and email
        // are required for the Navbar avatar and profile dropdown
        const user = await Usermodel
          .findById(decoded.id)
          .select("username email verified lastLogin");

        if (user) {
          return res.json({ status: true, user });
        }
      } catch {
        // accessToken expired — fall through to refresh
      }
    }

    // ── Case 2: try refreshToken ─────────────────────────────────────────────
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        const refreshTokenHash = crypto
          .createHash("sha256")
          .update(refreshToken)
          .digest("hex");

        const session = await Sessionmodel.findOne({
          user: decoded.id,
          refreshTokenHash,
          revoked: false,
        });

        if (!session || session.expiresAt < new Date()) {
          return res.json({ status: false });
        }

        // Select username + email so navbar shows them immediately
        const user = await Usermodel
          .findById(decoded.id)
          .select("username email verified lastLogin");

        if (!user) return res.json({ status: false });

        // Rotate tokens
        const newAccessToken  = generateAccessToken({
          id: user._id,
          sessionId: session._id,
        });
        const newRefreshToken = generateRefreshToken({
          id: user._id,
          sessionId: session._id,
        });

        const newRefreshTokenHash = crypto
          .createHash("sha256")
          .update(newRefreshToken)
          .digest("hex");

        session.refreshTokenHash = newRefreshTokenHash;
        session.lastUsedAt = new Date();
        await session.save();

        const cookieOpts = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };

        res.cookie("accessToken", newAccessToken, {
          ...cookieOpts,
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", newRefreshToken, {
          ...cookieOpts,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ status: true, user });

      } catch {
        return res.json({ status: false });
      }
    }

    // ── Case 3: no tokens ────────────────────────────────────────────────────
    return res.json({ status: false });

  } catch (error) {
    console.error("verifyUser error:", error);
    return res.json({ status: false });
  }
};

module.exports = verifyUser;