import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaWallet, FaUser, FaCogs } from 'react-icons/fa';
import './styles/Stats.css'; 

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* LEFT SIDE TEXT */}
        <motion.div
          className="stats-left"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="stats-item">
            <h2>Powerful Trading Tools</h2>
            <p>Access everything from advanced charting to real-time market data, all in one place.</p>
          </div>
          <div className="stats-item">
            <h2>Seamless Investments</h2>
            <p>Invest in stocks, mutual funds, and more with ease and confidence using our platform.</p>
          </div>
          <div className="stats-item">
            <a href="">Explore the products <FaArrowRight /></a>
            <a href="">Try Kite <FaArrowRight /></a>
          </div>
        </motion.div>

        {/* RIGHT SIDE ANIMATION */}
        <motion.div
          className="stats-right"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div className="circle-background" />

          <motion.div
            className="ecosystem-box"
            style={{ top: '10%', left: '60%' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaChartLine className="icon" /> Kite
          </motion.div>

          <motion.div
            className="ecosystem-box"
            style={{ top: '30%', left: '10%' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaWallet className="icon" /> Console
          </motion.div>

          <motion.div
            className="ecosystem-box"
            style={{ top: '70%', left: '70%' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaUser className="icon" /> Ditto
          </motion.div>

          <motion.div
            className="ecosystem-box"
            style={{ top: '80%', left: '20%' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaCogs className="icon" /> Sensibull
          </motion.div>

          <motion.div
            className="ecosystem-box"
            style={{ top: '50%', left: '40%' }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaWallet className="icon" /> Coin
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}