import React, { useState, useEffect, useRef } from "react";
import axiosAPI from "../api/axios";
import {
  FaTimes,
  FaChartLine,
  FaBoxOpen,
  FaDollarSign,
  FaHeadset,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiAlignRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { useAuth } from "../context/authContext";

const AvatarCircle = ({ name, size = 42 }) => (
  <div
    className="avatar-circle"
    style={{ width: size, height: size, fontSize: size * 0.38 }}
  >
    {name?.charAt(0).toUpperCase()}
  </div>
);

function Navbar() {
  // Fix: single source of truth — use AuthContext only, no extra verify call here
  const { user, setUser } = useAuth();
  const isLogIn = !!user;

  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const scrollToTop = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowProfile(false);
  };

  const handleLogout = async () => {
    try {
      await axiosAPI.post("/api/auth/logout");
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await axiosAPI.post("/api/auth/logoutAll");
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="navbar">
      <div className="max-w">
        {/* Logo */}
        <div className="left">
          <div className="logo">
            <Link to="/" onClick={scrollToTop}>
              <h1>Zerodha</h1>
            </Link>
          </div>
        </div>

        {/* Nav links + auth */}
        <div className="right" ref={menuRef}>
          <div className="hamburg" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FiAlignRight />}
          </div>

          <ul className={isOpen ? "links active-links" : "links"}>
            {/* Mobile-only profile header */}
            {isLogIn && (
              <div className="mobile-profile">
                <AvatarCircle name={user?.username} size={68} />
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
                <div className="mobile-profile-actions">
                  <a href="http://localhost:3001">
                    <FaUserCircle /> Dashboard
                  </a>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                  <button onClick={handleLogoutAll}>
                    <FaSignOutAlt /> LogoutAll
                  </button>
                </div>
              </div>
            )}

            <li className="link">
              <Link to="/" onClick={() => { scrollToTop(); closeMenu(); }}>
                <FaChartLine /> Home
              </Link>
            </li>
            <li className="link">
              <Link to="/about" onClick={() => { scrollToTop(); closeMenu(); }}>
                <FaBoxOpen /> About
              </Link>
            </li>
            <li className="link">
              <Link to="/products" onClick={() => { scrollToTop(); closeMenu(); }}>
                <FaBoxOpen /> Products
              </Link>
            </li>
            <li className="link">
              <Link to="/pricing" onClick={() => { scrollToTop(); closeMenu(); }}>
                <FaDollarSign /> Pricing
              </Link>
            </li>
            <li className="link">
              <Link to="/support" onClick={() => { scrollToTop(); closeMenu(); }}>
                <FaHeadset /> Support
              </Link>
            </li>

            {/* Desktop auth buttons / avatar */}
            <div className="buttons">
              {isLogIn ? (
                <div className="profile-wrapper">
                  <div
                    className="profile-trigger"
                    onClick={() => setShowProfile((prev) => !prev)}
                  >
                    <AvatarCircle name={user?.username} size={42} />
                  </div>

                  {showProfile && (
                    <div className="profile-dropdown">
                      <div className="profile-top">
                        <AvatarCircle name={user?.username} size={54} />
                        <div className="profile-text">
                          <h3>{user?.username}</h3>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                      <div className="profile-menu">
                        <a href="http://localhost:3001">
                          <FaUserCircle /> Dashboard
                        </a>
                        <button onClick={handleLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                        <button onClick={handleLogoutAll}>
                          <FaSignOutAlt /> LogoutAll
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-light">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-dark">Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;