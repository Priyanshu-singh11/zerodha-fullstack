import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import Menu from "./Menu";
import "./styles/TopBar.css";

const INDICES = [
  { name: "NIFTY 50", value: "22,540.20", change: "+0.52%" },
  { name: "SENSEX",   value: "74,220.11", change: "+0.41%" },
];

const IndexCard = ({ name, value, change }) => (
  <div className="index-card">
    <p className="index-name">{name}</p>
    <p className="index-value">{value}</p>
    <p className="index-change">{change}</p>
  </div>
);

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <div className="topbar-container">

      {/* Logo */}
      <div className="logo">Zerodha</div>

      {/* Desktop indices */}
      <div className="indices-container">
        {INDICES.map((idx) => <IndexCard key={idx.name} {...idx} />)}
      </div>

      {/* Nav drawer */}
      <div className={`menu-wrapper${isMenuOpen ? " open" : ""}`}>
        <Menu closeMenu={closeMenu} />

        {/* Mobile-only indices inside drawer */}
        <div className="mobile-indices">
          {INDICES.map((idx) => <IndexCard key={idx.name} {...idx} />)}
        </div>
      </div>

      {/* Backdrop — closes menu when tapping outside */}
      {isMenuOpen && (
        <div className="menu-backdrop" onClick={closeMenu} />
      )}

      {/* Hamburger */}
      <button
        className="hamburger"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen
          ? <Close style={{ color: "#fff", fontSize: "2rem" }} />
          : <MenuIcon style={{ color: "#fff", fontSize: "2rem" }} />
        }
      </button>

    </div>
  );
};

export default TopBar;