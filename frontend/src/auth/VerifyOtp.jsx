import React, { useState, useEffect, useRef } from "react";
import "./styles/VerifyOtp.css";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../api/axios";
import { useAuth } from "../context/authContext";
import useAuthRedirect from "../hooks/useAuthRedirect ";

const VerifyOtp = () => {
  const [otp, setOtp]     = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate       = useNavigate();
  const location       = useLocation();
  const { fetchUser }  = useAuth();
  const email          = location.state?.email;

  // "guest" → if already logged in, go to "/"
  const { loading } = useAuthRedirect("guest");

  // Guard: no email in state → bounce back to signup (once only, StrictMode safe)
  const emailGuard = useRef(false);
  useEffect(() => {
    if (loading) return;
    if (!email && !emailGuard.current) {
      emailGuard.current = true;
      toast.error("Session expired. Please sign up again.");
      navigate("/signup", { replace: true });
    }
  }, [loading]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error("Enter the 6-digit OTP"); return; }
    setIsBusy(true);
    try {
      const res = await axiosAPI.post("/api/auth/verify-otp", { email, otp });
      toast.success(res.data.message || "Email verified!");
      await fetchUser();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setIsBusy(false);
    }
  };

  if (loading || !email) return null;

  return (
    <div className="verify-otp-page">
      <div className="bg-circle one" />
      <div className="bg-circle two" />

      <motion.div
        className="verify-otp-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT */}
        <motion.div className="verify-otp-left"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">EMAIL VERIFICATION</span>
          <h1>Verify your<br />email.</h1>
          <p>We've sent a 6-digit code to <strong>{email}</strong>. Enter it below to activate your account.</p>
          <div className="stats">
            <motion.div className="stat-box" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h3>6</h3><span>Digit OTP</span>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h3>5 min</h3><span>Validity</span>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="verify-otp-right"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="form-top">
            <h2>Enter OTP</h2>
            <p>Sent to <strong>{email}</strong></p>
          </div>

          <form className="verify-otp-form" onSubmit={handleVerify}>
            <div className="input-group">
              <label>6-digit OTP</label>
              <motion.input
                whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}
                type="text" inputMode="numeric" pattern="[0-9]*"
                maxLength="6" placeholder="— — — — — —"
                className="otp-input" value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
            </div>

            <div className="resend-row">
              <span>Didn't receive it?</span>
              <button type="button"
                className={`resend-btn ${timer > 0 ? "disabled" : ""}`}
                onClick={() => { toast.info("Please sign up again for a new OTP."); navigate("/signup", { replace: true }); }}
                disabled={timer > 0}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </div>

            <motion.button
              whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }} type="submit"
              className="verify-otp-btn" disabled={otp.length !== 6 || isBusy}
            >
              {isBusy ? "Verifying..." : "Verify Email"} <FaArrowRight />
            </motion.button>
          </form>

          <div className="bottom-text">
            <Link to="/signup" className="back-link"><FaArrowLeft /> Back to Signup</Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;