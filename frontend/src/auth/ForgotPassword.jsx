import React, { useState } from "react";
import "./styles/ForgotPassword.css";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axios";
import useAuthRedirect from "../hooks/useAuthRedirect ";

const ForgotPassword = () => {
  const [email, setEmail]   = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const navigate            = useNavigate();

  // "guest" → redirect to "/" if already logged in
  const { loading } = useAuthRedirect("guest");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    setIsBusy(true);
    try {
      const res = await axiosAPI.post("/api/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });
      toast.success(res.data.message || "OTP sent to your email");
      navigate("/verify-reset-otp", { state: { email: email.trim().toLowerCase() } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div className="fp-page">
      <div className="fp-glow glow-1" />
      <div className="fp-glow glow-2" />

      <motion.div className="fp-card"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT */}
        <div className="fp-left">
          <div className="fp-brand">
            <span className="fp-logo">Z<span className="dot">.</span></span>
            <span className="fp-brand-name">Zerodha</span>
          </div>
          <div className="fp-left-content">
            <div className="fp-icon-wrap"><FaShieldAlt className="fp-shield-icon" /></div>
            <h1>Account<br />Recovery</h1>
            <p>Enter your registered email and we'll send you a secure OTP to reset your password.</p>
          </div>
          <div className="fp-badges">
            <div className="fp-badge"><span className="badge-val">5 min</span><span className="badge-label">OTP Expiry</span></div>
            <div className="fp-badge"><span className="badge-val">256-bit</span><span className="badge-label">Encrypted</span></div>
            <div className="fp-badge"><span className="badge-val">Secure</span><span className="badge-label">Transfer</span></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="fp-right">
          <div className="fp-form-header">
            <h2>Forgot Password?</h2>
            <p>We'll send an OTP to your registered email</p>
          </div>
          <form className="fp-form" onSubmit={handleSubmit}>
            <div className="fp-input-group">
              <label>Email Address</label>
              <div className="fp-input-wrap">
                <FaEnvelope className="fp-input-icon" />
                <motion.input
                  whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                  type="email" placeholder="Enter your registered email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoFocus
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" className="fp-btn" disabled={isBusy}
            >
              {isBusy ? <span className="fp-spinner" /> : <>Send OTP <FaArrowRight /></>}
            </motion.button>
          </form>
          <div className="fp-footer">
            <Link to="/login" className="fp-back"><FaArrowLeft /> Back to Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;