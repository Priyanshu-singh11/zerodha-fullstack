import React from 'react';
import './styles/Award.css';

function Award() {
  return (
    <div className="award-section">
      <div className='award-wrapper'>
        <div className="award-image">
        {/* SVG Trophy Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#3b82f6"
          className="trophy-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 3H8v2H5.5A1.5 1.5 0 004 6.5v1A3.5 3.5 0 007.5 11 5.5 5.5 0 0012 16.5V18H9a1 1 0 000 2h6a1 1 0 000-2h-3v-1.5A5.5 5.5 0 0016.5 11 3.5 3.5 0 0020 7.5v-1A1.5 1.5 0 0018.5 5H16V3z"
          />
        </svg>
      </div>
      <div className="award-content">
        <h1>Largest stock broker in India</h1>
        <p>
          2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily, through trading and investing.
        </p>
        <div className="benefits">
          <ul>
            <li>Futures and Options</li>
            <li>Commodity derivatives</li>
            <li>Currency derivatives</li>
          </ul>
          <ul>
            <li>Stocks & IPOs</li>
            <li>Direct mutual funds</li>
            <li>Bonds</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Award;





