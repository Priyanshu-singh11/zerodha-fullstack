import React, { useState, useEffect, useRef } from "react";
import "./styles/VerifyResetOtp.css";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axios";
import useAuthRedirect from "../hooks/useAuthRedirect ";

const VerifyResetOtp = () => {
  const [otp, setOtp]     = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email;

  // "guest" → if already logged in, go to "/"
  const { loading } = useAuthRedirect("guest");

  const emailGuard = useRef(false);
  useEffect(() => {
    if (loading) return;
    if (!email && !emailGuard.current) {
      emailGuard.current = true;
      toast.error("Session expired. Please start again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [loading]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleResend = async () => {
    if (timer > 0 || isBusy) return;
    setIsBusy(true);
    try {
      const res = await axiosAPI.post("/api/auth/forgot-password", { email });
      toast.success(res.data.message || "OTP resent");
      setTimer(60); setOtp("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally { setIsBusy(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Please enter the 6-digit OTP"); return; }
    navigate("/reset-password", { state: { email, otp } });
  };

  if (loading || !email) return null;

  return (
    <div className="vro-page">
      <div className="vro-glow glow-1" />
      <div className="vro-glow glow-2" />

      <motion.div className="vro-card"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT */}
        <div className="vro-left">
          <div className="vro-brand">
            <span className="vro-logo">Z<span className="dot">.</span></span>
            <span className="vro-brand-name">Zerodha</span>
          </div>
          <div className="vro-left-content">
            <div className="vro-icon-wrap"><FaEnvelope className="vro-envelope-icon" /></div>
            <h1>Check your<br />inbox.</h1>
            <p>We've sent a 6-digit code to<br /><strong>{email}</strong>.<br />It expires in 5 minutes.</p>
          </div>
          <div className="vro-badges">
            <div className="vro-badge"><span className="badge-val">6</span><span className="badge-label">Digit OTP</span></div>
            <div className="vro-badge"><span className="badge-val">5 min</span><span className="badge-label">Validity</span></div>
            <div className="vro-badge">
              <span className={`badge-val ${timer <= 0 ? "green" : ""}`}>{timer > 0 ? `${timer}s` : "Ready"}</span>
              <span className="badge-label">Resend</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="vro-right">
          <div className="vro-form-header">
            <h2>Enter OTP</h2>
            <p>Sent to <strong>{email}</strong></p>
          </div>
          <form className="vro-form" onSubmit={handleSubmit}>
            <div className="vro-input-group">
              <label>6-digit OTP</label>
              <motion.input
                whileFocus={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                type="text" inputMode="numeric" pattern="[0-9]*"
                maxLength="6" placeholder="——————"
                className="vro-otp-input" value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
              <div className="vro-dots">
                {[0,1,2,3,4,5].map((i) => (
                  <span key={i} className={`vro-dot ${i < otp.length ? "filled" : ""}`} />
                ))}
              </div>
            </div>
            <div className="vro-resend-row">
              <span>Didn't receive it?</span>
              <button type="button" className="vro-resend-btn"
                onClick={handleResend} disabled={timer > 0 || isBusy}
              >
                {isBusy ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" className="vro-btn" disabled={otp.length !== 6}
            >
              Verify & Continue <FaArrowRight />
            </motion.button>
          </form>
          <div className="vro-footer">
            <Link to="/forgot-password" className="vro-back"><FaArrowLeft /> Change Email</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyResetOtp;