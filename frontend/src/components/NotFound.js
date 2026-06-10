import React from 'react';
import './styles/NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-graphic">
          {/* Circular X SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="notfound-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="notfound-button">Go Back Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
