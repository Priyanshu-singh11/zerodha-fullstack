import React, { useState } from "react";
import "./styles/SignUp.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axiosAPI from "../../api/axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchema";
import useAuthRedirect from "../../hooks/useAuthRedirect ";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // "guest" → redirect to "/" if already logged in
  const { loading } = useAuthRedirect("guest");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosAPI.post("/api/auth/signup", data);
      toast.success(res.data.message);
      reset();
      navigate("/verify-otp", {
        state: { email: res.data.email },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Don't render form while auth check is in progress — prevents flash
  if (loading) return null;

  return (
    <section className="signup-page">
      <div className="blur-circle one" />
      <div className="blur-circle two" />

      <motion.div
        className="signup-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT */}
        <motion.div
          className="signup-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="mini-tag">JOIN PLATFORM</span>
          <h1>
            Create your<br />
            trading account.
          </h1>
          <p>
            Start investing with a clean modern platform
            trusted by thousands of traders and investors
            worldwide.
          </p>
          <div className="feature-list">
            <div className="feature-card">
              <h3>10K+</h3>
              <span>Active users</span>
            </div>
            <div className="feature-card">
              <h3>100%</h3>
              <span>Secure system</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="signup-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="form-top">
            <h2>Create Account</h2>
            <p>Signup and explore the dashboard</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username")}
              />
              {errors.username && (
                <p className="error-text">{errors.username.message}</p>
              )}
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="signup-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
              <FaArrowRight />
            </motion.button>

          </form>

          <p className="bottom-text">
            Already have an account?{" "}
            <span><Link to="/login">Login</Link></span>
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default SignUp;