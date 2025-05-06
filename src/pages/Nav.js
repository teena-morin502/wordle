import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiGamepad } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { auth, db } from "./../helpers/FireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import Settings from "./Settings";
import "./../styles/nav.css";

function Nav() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;

  const settingsRef = useRef(null);
  const settingsModalRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        settingsModalRef.current &&
        !settingsModalRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid));
        await signOut(auth);
        setUser(null);
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  if (page === "/" || page === "/register") {
    return null;
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/games" className="logo">
          <GiGamepad className="logo-icon" /> TinkyTussle
        </Link>

        <div className="nav-links">
          <div className="settings-dropdown" ref={settingsRef}>
            <FiSettings
              size={24}
              className="settings-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ cursor: "pointer" }}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setDropdownOpen(false);
                  }}
                >
                  Background
                </div>
              </div>
            )}
          </div>

          {user ? (
            <button className="nav-link-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </nav>

      {showSettings && (
        <div className="settings-modal" ref={settingsModalRef}>
          <button
            className="close-settings"
            onClick={() => setShowSettings(false)}
          >
            Close
          </button>
          <Settings closeSettings={() => setShowSettings(false)} />
        </div>
      )}
    </>
  );
}

export default Nav;
