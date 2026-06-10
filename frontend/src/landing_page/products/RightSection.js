import './styles/RightSection.css';
import { motion } from 'framer-motion';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const RightSection = ({heading, desc, img,link}) => {
  return (
    <motion.section
      className="right-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="right-content">
        <div className="right-left">
          <h1 className="right-heading">{heading}</h1>
          <p className="right-paragraph">
            {desc}
          </p>
          <a href={'https://zerodha.com/products/console'} className="right-learn-link">Learn More →</a>
          
        </div>

        <div className="right-visual">
          <a href={'https://zerodha.com/products/console'} >
          <LazyLoadImage
            loading="lazy"
            effect="blur"
            threshold={300}
            wrapperProps={{
              style: {
                transition:
                  "all 1s ease"
              }
            }}
           src={img} alt="Kite UI" className="demo-image" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default RightSection;