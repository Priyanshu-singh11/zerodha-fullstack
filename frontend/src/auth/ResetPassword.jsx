import React, { useState, useEffect, useRef } from "react";
import "./styles//ResetPassword.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axios";
import { useAuth } from "../context/authContext";
import useAuthRedirect from "../hooks/useAuthRedirect ";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser } = useAuth();

  const email = location.state?.email;
  const otp = location.state?.otp;

  // guest-only page — logged-in users go to "/"
  const { loading } = useAuthRedirect("guest");

  const emailGuard = useRef(false);
  useEffect(() => {
    if (loading) return;
    if ((!email || !otp) && !emailGuard.current) {
      emailGuard.current = true;
      toast.error("Session expired. Please start again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [loading]);

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsBusy(true);
    try {
      // Backend resets password AND sets accessToken + refreshToken cookies
      const res = await axiosAPI.post("/api/auth/reset-password", {
        email,
        otp,
        password: newPassword,
      });

      toast.success(res.data.message || "Password reset successfully!");

      // fetchUser() hits /api/auth/verify which now reads the fresh cookies
      // the backend just set — so user + name loads correctly
      await fetchUser();

      // Navigate AFTER fetchUser resolves so AuthContext has the user
      toast.success("Password reset successfully");
      navigate("/login", { replace: true });

    } catch (error) {
      const msg = error.response?.data?.message || "Reset failed";
      toast.error(msg);

      if (
        msg.toLowerCase().includes("otp") ||
        msg.toLowerCase().includes("expired") ||
        msg.toLowerCase().includes("invalid")
      ) {
        navigate("/verify-reset-otp", { state: { email }, replace: true });
      }
    } finally {
      setIsBusy(false);
    }
  };

  if (loading || !email || !otp) return null;

  return (
    <div className="reset-page">
      <div className="bg-circle one" />
      <div className="bg-circle two" />

      <motion.div
        className="reset-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── LEFT ── */}
        <motion.div
          className="reset-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">ALMOST DONE</span>
          <h1>
            Set your<br />
            new password.
          </h1>
          <p>
            Choose a strong password you haven't used before.
            You'll be logged in automatically after reset —
            no extra login step needed.
          </p>
          <div className="stats">
            <motion.div
              className="stat-box"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3>6+</h3>
              <span>Min chars</span>
            </motion.div>
            <motion.div
              className="stat-box"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3>256bit</h3>
              <span>Encrypted</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div
          className="reset-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="form-top">
            <h2>New Password</h2>
            <p>Must be at least 6 characters</p>
          </div>

          <form className="reset-form" onSubmit={handleSubmit}>

            {/* New password */}
            <div className="input-group">
              <label>New Password</label>
              <div className="password-box">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoFocus
                />
                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {newPassword.length > 0 && newPassword.length < 6 && (
                <p className="error-text">At least 6 characters required</p>
              )}
            </div>

            {/* Confirm password */}
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-box">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length > 0 && (
                  <span className={`match-icon ${passwordsMatch ? "ok" : "no"}`}>
                    {passwordsMatch ? "✓" : "✗"}
                  </span>
                )}
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="error-text">Passwords do not match</p>
              )}
            </div>

            <motion.button
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              type="submit"
              className="reset-btn"
              disabled={
                isBusy ||
                !newPassword ||
                !confirmPassword ||
                !passwordsMatch ||
                newPassword.length < 6
              }
            >
              {isBusy ? "Resetting..." : "Reset Password"}
              <FaArrowRight />
            </motion.button>

          </form>

          <div className="bottom-text">
            <Link
              to="/verify-reset-otp"
              state={{ email }}
              className="back-link"
            >
              <FaArrowLeft /> Back
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ResetPassword;