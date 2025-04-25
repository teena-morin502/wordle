import React from "react";
import { Link } from "react-router-dom";
import "./../styles/nav.css";
import { GiGamepad } from "react-icons/gi";

function Nav() {
  return (
    <nav className="nav-bar">
      <Link to="/games" className="logo">
        <GiGamepad className="logo-icon" /> TinkyTussle
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
