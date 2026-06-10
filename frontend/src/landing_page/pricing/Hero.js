import './styles/Hero.css';
import { motion } from 'framer-motion';
import { FaRupeeSign } from 'react-icons/fa';

const Hero = () => {
  return (
    <motion.section
    style={{margin:'0'}}
      className="pricing-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: false }}
    >
      <div className="pricing-wrapper">
        <h1 className="pricing-title">Charges</h1>
        <p className="pricing-subtext">List of all charges and taxes</p>

        <div className="pricing-grid">
          {/* Column 1 */}
          <motion.div
            className="pricing-box"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.1 }}
          >
            <div className="price-value">
              <FaRupeeSign className="rs-icon" />
              <span>0</span>
            </div>
            <h3>Free equity delivery</h3>
            <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.</p>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            className="pricing-box"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.1, delay: 0}}
          >
            <div className="price-value">
              <FaRupeeSign className="rs-icon" />
              <span>20</span>
            </div>
            <h3>Intraday and F&O trades</h3>
            <p>Flat ₹20 or 0.03% (whichever is lower) per executed order. ₹20 flat for all option trades.</p>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            className="pricing-box"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <div className="price-value">
              <FaRupeeSign className="rs-icon" />
              <span>0</span>
            </div>
            <h3>Free direct MF</h3>
            <p>All direct mutual fund investments are absolutely free — ₹0 commissions & DP charges.</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
