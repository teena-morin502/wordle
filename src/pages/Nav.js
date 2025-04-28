import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiGamepad } from "react-icons/gi";
import { auth, db } from "./../helpers/FireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import "./../styles/nav.css";

function Nav() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
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
    <nav className="nav-bar">
      <Link to="/games" className="logo">
        <GiGamepad className="logo-icon" /> TinkyTussle
      </Link>

      <div className="nav-links">
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
  );
}

export default Nav;
