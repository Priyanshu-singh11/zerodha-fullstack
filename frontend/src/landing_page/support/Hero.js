import './styles/Hero.css';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-inner">
        {/* Left Column */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-heading-group">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Support Portal
            </motion.h1>

            <motion.span 
              className="track-tag"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Track tickets
            </motion.span>
          </div>

          <motion.h2 
            className="hero-subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Search for an answer or browse help topics to create a ticket
          </motion.h2>

          <motion.div 
            className="search-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected ..."
            />
          </motion.div>

          <motion.div 
            className="hero-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#">Track account opening</a>
            <a href="#">Track segment activation</a>
            <a href="#">Intraday margins</a>
            <a href="#">Kite user manual</a>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="featured-heading">Featured</h2>
          <ul className="featured-links">
            <li><a href="#">Quarterly Settlement of Funds - July 2025</a></li>
            <li><a href="#">Exclusion of F&O contracts on 8 securities from August 29, 2025</a></li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
