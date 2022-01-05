import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <img className="logo" src={Logo} alt="logo" />
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link active"
              name="taller"
              to="/taller"
              id="taller"
            >
              <i id="taller" className="fas fa-cogs"></i> Taller
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              name="servicios"
              to="/servicios"
              id="servicios"
            >
              <i id="servicios" className="fas fa-car"></i> Servicios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
