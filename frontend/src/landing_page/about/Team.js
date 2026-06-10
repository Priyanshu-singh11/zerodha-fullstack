import React from 'react';
import './styles/Team.css';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Team = () => {
  return (
    <div className="team-section">
      <motion.h1
        className="team-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        People
      </motion.h1>

      <div className="team-content">
        <motion.div
          className="team-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <LazyLoadImage
            loading="lazy"
            effect="blur"
            threshold={100}
            wrapperProps={{
              style: {
                transition:
                  "all 1s ease"
              }
            }}
            src='./About-images/nithinKamath.jpg'
            alt="Nithin Kamath"
            className="team-image"
          />
          <h2>Nithin Kamath</h2>
          <p className="team-role">Founder, CEO</p>
        </motion.div>

        <motion.div
          className="team-right"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during
            his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data
            Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>

          <div className="team-links">
            <span>Connect on:</span>
            <a href="https://zerodha.com">Homepage</a>
            <a href="https://tradingqna.com">TradingQnA</a>
            <a href="https://twitter.com/Nithin0dha">Twitter</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;