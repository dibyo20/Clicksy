import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar-glass">
      <Link to="/" className="nav-brand">
        <img src="/logo.png" alt="Clicksy Logo" className="logo-icon" />
        <span>Clicksy</span>
      </Link>
    </nav>
  );
};

export default Navbar;
