import React from "react";
import { Link } from "react-router-dom";
import "./../styles/nav.css";
import { GiGamepad } from "react-icons/gi";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const page = location.pathname;

  if (page === "/" || page === "/register") {
    return;
  }

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
