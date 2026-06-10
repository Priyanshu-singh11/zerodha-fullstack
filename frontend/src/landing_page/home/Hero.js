import './styles/Hero.css';
import React, { useRef,useState,useEffect } from 'react';
import axiosAPI from '../../api/axios'
import {Link} from 'react-router-dom'
export default function Hero() {

  const imageRef = useRef(null);
  const [user, setUser] = useState("");

//   useEffect(() => {
//   axiosAPI.get('/api/auth/verify')
//   .then((res) => {
//     if (res.data.status) {
//       setUser(res.data.user.username);
//     }
//   });
// }, []);
  const handleMouseMove = (e) => {
    const image = imageRef.current;
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div>
      {user ? (
  <div id="welcome-user">

    <div className="status-dot"></div>

    <div className="welcome-text">
      <p>WELCOME BACK</p>
      <h1>
        Hey,
        <br />
        {user}
      </h1>
    </div>

  </div>
) : null}
      <div className="hero-container">
       
      <div className="image-wrapper">
        <img
          ref={imageRef}
          src="/Home-images/hero.webp"
          alt="Hero"
          className="hero-image"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      <div className="description">
        <h1>Invest in everything</h1>
        <p>
          Online platform to invest in <strong>stocks</strong>, <strong>mutual funds</strong>,
          <strong> derivatives</strong>, <strong>bonds</strong>, and more.
        </p>
        
          <Link to ='/signup' className='btn-link'>
          <button>Sign up for free</button>
          </Link>
        
      </div>
    </div>
    </div>
  );
}

