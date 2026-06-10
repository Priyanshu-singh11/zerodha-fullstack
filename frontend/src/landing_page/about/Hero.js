import React from 'react';
import './styles/Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero-section">
      <motion.h3
        className="hero-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
      >
        We pioneered the discount broking model in India.<br />
        Now, we are breaking ground with our technology.
      </motion.h3>

      <div className="hero-content">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
         
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal of breaking all
            barriers that traders and investors face in India in terms of cost, support, and technology.
            We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.
          </p>
          <p>
            Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms,
            contributing over 15% of all Indian retail trading volumes.
          </p>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p>
            In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href='#'>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on the latest updates on our
            <a href="#"> blog</a>, or see what the media is <a href="#">saying about us</a>, or learn more about our  business and product
            <a href="#"> philosophies</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;