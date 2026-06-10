import React from "react";
import "./UnauthorizedPopup.css";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const UnauthorizedPopup = () => {
  return (

    <div className="unauthorized-overlay">

      <motion.div
        className="unauthorized-popup"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >

        <div className="icon-wrapper">
          <FaShieldAlt className="shield-icon" />
        </div>

        <h2>Unauthorized Access</h2>

        <p>
          Please login to access your dashboard and trading data.
        </p>

        <button
          onClick={() => window.location.href = "http://localhost:3000/signup"}
        >
          Go To Login
        </button>

      </motion.div>

    </div>
  );
};

export default UnauthorizedPopup;