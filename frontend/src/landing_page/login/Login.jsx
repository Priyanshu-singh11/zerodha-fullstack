import React, { useState } from "react";
import "./styles/Login.css";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import axiosAPI from "../../api/axios";
import { loginSchema } from "../../schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthRedirect from "../../hooks/useAuthRedirect ";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  // "guest" → redirect to "/" if already logged in
  const { loading } = useAuthRedirect("guest");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosAPI.post("/api/auth/login", data);
      toast.success(res.data.message);
      await fetchUser();
      navigate("/", { replace: true });
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Don't render form while checking auth — prevents flash
  if (loading) return null;

  return (
    <div className="login-page">
      <div className="bg-circle one" />
      <div className="bg-circle two" />

      <motion.div
        className="login-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT */}
        <motion.div
          className="login-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tag">MODERN EXPERIENCE</span>
          <h1>Build.<br />Trade.<br />Grow.</h1>
          <p>
            A clean modern dashboard experience with smooth
            interactions, premium aesthetics and beautiful
            responsive layouts.
          </p>
          <div className="stats">
            <motion.div className="stat-box" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h3>10K+</h3>
              <span>Users</span>
            </motion.div>
            <motion.div className="stat-box" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <h3>99%</h3>
              <span>Secure</span>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="login-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="form-top">
            <h2>Welcome Back</h2>
            <p>Login to continue your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label>Email Address</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-box">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              type="submit"
              className="login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Login"}
              <FaArrowRight />
            </motion.button>
          </form>

          <div className="bottom-text">
            Don't have an account?{" "}
            <Link to="/signup">Create account</Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;