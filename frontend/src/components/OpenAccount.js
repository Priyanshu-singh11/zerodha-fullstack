import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/OpenAccount.css';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

function OpenAccount() {
  return (
    <div className="open-account-section">
      <motion.div
        className="open-account-card"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div variants={childVariants}>
          <FaChartLine className="account-icon" />
        </motion.div>
        <motion.h1 className="account-heading" variants={childVariants}>
          Open a Zerodha account
        </motion.h1>
        <motion.p className="account-subtext" variants={childVariants}>
          Invest in stocks, mutual funds, and more with the most trusted platform.
        </motion.p>
         <Link to='/signup' className='btn-link'>
        <motion.button className="account-button" variants={childVariants}>
          Sign Up Now
        </motion.button>
        </Link>
      </motion.div> 
    </div>
  );
}

export default OpenAccount;
