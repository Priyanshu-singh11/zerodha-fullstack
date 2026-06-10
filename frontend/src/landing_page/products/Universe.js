import './styles/Universe.css';
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import {
  LazyLoadImage
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const platforms = [
  {
    name: 'Tijori',
    desc: 'Explore deep fundamental insights, financials, and data-driven metrics for Indian stocks to make better investment decisions.',
    img: 'https://zerodha.com/static/images/partners/tijori.svg',
    link: '#'
  },
  {
    name: 'Ditto',
    desc: 'Buy insurance confidently with simplified guidance and clear choices through Ditto, partnered with Zerodha.',
    img: 'Products-image/dittoLogo.png',
    link: '#'
  },
  {
    name: 'Zerodha Fund House',
    desc: 'A passive-only mutual fund company by Zerodha, built to simplify long-term index investing.',
    img: 'Products-image/zerodhaFundHouse.png',
    link: '#'
  },
  {
    name: 'Smallcase',
    desc: 'Diversify easily by investing in thematic baskets of stocks and ETFs curated by experts.',
    img: 'Products-image/smallcaseLogo.png',
    link: '#'
  },
  {
    name: 'Sensibull',
    desc: 'The most beginner-friendly platform for learning and trading options in India.',
    img: 'Products-image/sensibullLogo.svg',
    link: '#'
  },
  {
    name: 'Streak',
    desc: 'Backtest, deploy, and automate your trading strategies—no coding needed.',
    img: 'Products-image/streakLogo.png',
    link: '#'
  }
];

const Universe = () => {
  return (
    <section className="universe-section">
      <div className="universe-container">
        <motion.h2
          className="universe-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          The Zerodha Universe
        </motion.h2>

        <motion.p
          className="universe-subtext"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: false }}
        >
          Extend your trading and investing experience with these powerful partner platforms.
        </motion.p>

        <div className="universe-grid">
          {platforms.map((platform, idx) => (
            <motion.a
              href={platform.link}
              key={idx}
              className="universe-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: false }}
            >
              <div className="universe-logo">
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
                  src={platform.img} alt={platform.name} />
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.desc.split(' ').slice(0, 30).join(' ')}...</p>
            </motion.a>
          ))}
        </div>
        <Link to='/signup' className='btn-link'>
        <button className='sign-up'>Sign up for free</button>
        </Link>
      </div>
    </section>
  );
};

export default Universe;
