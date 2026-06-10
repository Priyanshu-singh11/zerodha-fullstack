import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './styles/Education.css';

export default function Education() {
  return (
    <section className="education-section">
      <div className="education-container">

        {/* Left: SVG Graphic */}
        <motion.div
          className="education-left"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="30" y="50" width="140" height="100" rx="12" fill="#3b82f6" />
            <line x1="50" y1="80" x2="150" y2="80" stroke="white" strokeWidth="4" />
            <line x1="50" y1="100" x2="120" y2="100" stroke="white" strokeWidth="4" />
            <circle cx="60" cy="130" r="6" fill="white" />
            <circle cx="80" cy="130" r="6" fill="white" />
            <circle cx="100" cy="130" r="6" fill="white" />
          </svg>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          className="education-right"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2>Empower Your Financial Journey</h2>

          <p>
            Discover in-depth tutorials and curated guides that help you master the art of
            investing, whether 
          </p>
          <a href="#">
            see here  <FaArrowRight />
          </a>

          <p>
            From understanding market indicators to planning long-term investments, our educational
            resources  
          </p>

          <a href="#">
            Browse all resources <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
