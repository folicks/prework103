import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">Creators</Link>
    </div>
    <div className="navbar-links">
      <Link to="/add">Add Creator</Link>
    </div>
  </nav>
);

export default Navbar;
