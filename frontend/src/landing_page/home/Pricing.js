import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './styles/Pricing.css';

export default function Pricing() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {/* LEFT SIDE */}
        <motion.div
          className="pricing-left"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <h2>Get Started for Free</h2>
          <p>Access all core features at ₹0. No hidden fees.</p>
          <a href="#">
            Learn more <FaArrowRight className="icon" />
          </a>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="pricing-right"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <div className="price-box">
            <h3>₹0</h3>
            <p>Basic investing, real-time data, and analysis tools.</p>
          </div>
          <div className="price-box">
            <h3>₹40</h3>
            <p>Advanced charting, analytics & premium tools.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
