const Sessionmodel = require("../model/Sessionmodel");

const logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;

    await Sessionmodel.updateMany(
      {
        userId,
        revoked: false,
      },
      {
        revoked: true,
        revokedAt: new Date(),
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    console.error("Logout All Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = logoutAll;