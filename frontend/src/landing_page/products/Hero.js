import './styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <h1 className="product-hero-heading">Zerodha Products</h1>
      <p className="hero-subtext">
        Sleek, modern, and intuitive trading platforms
      </p>
      <p className="hero-link-text">
        Check out our <a href="#" className="hero-link">investment offerings →</a>
      </p>
    </div>
  );
};

export default Hero;