import './styles/LeftSection.css';
import { motion } from 'framer-motion';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const LeftSection = ({ heading, desc, img, links }) => {
  return (
    <motion.section
      className="left-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="left-wrapper">
        <div className="left-image">
          <a href={links[1]}>
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              threshold={100}
              wrapperProps={{
                style: {
                  transition:
                    "all 1s ease"
                }
              }} src={img} alt="Zerodha Visual" />
          </a>
        </div>

        <div className="left-text">
          <h2>{heading}</h2>
          <p>{desc}</p>

          <div className="left-buttons">
            <a href={links[0]} className="left-btn primary">Try Demo</a>
            <a href={links[1]} className="left-btn">Learn More</a>
          </div>
          <div className="store-icons">
            <a
              href='https://play.google.com/store/apps/details?id=com.zerodha.kite3&pli=1' className="store-link">
              <FaGooglePlay className="store-icon" /> Google Play
            </a>
            <a href="https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802" className="store-link">
              <FaApple className="store-icon" /> Apple Store
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LeftSection;