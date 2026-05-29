import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar-glass">
      <Link to="/" className="nav-brand">
        Clicksy
      </Link>
    </nav>
  );
};

export default Navbar;
