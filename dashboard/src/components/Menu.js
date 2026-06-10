import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/TopBar.css";

const NAV_LINKS = [
  { to: "/",          label: "Summary"   },
  { to: "/holdings",  label: "Holdings"  },
  { to: "/positions", label: "Positions" },
  { to: "/funds",     label: "Funds"     },
  { to: "/orders",    label: "Orders"    },
  { to: "/apps",      label: "Apps"      },
];

const Menu = ({ closeMenu }) => (
  <div className="menu-container">
    {NAV_LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? "menu-link active" : "menu-link"
        }
      >
        {label}
      </NavLink>
    ))}
  </div>
);

export default Menu;