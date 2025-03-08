"use client";
import React, { useState } from "react";
import { BsHexagon } from "react-icons/bs";
import {
  FaUserCircle,
  FaGem,
  FaRegCircle,
  FaUsers,
  FaFireAlt,
  FaChartBar,
  FaBars,
  FaSun,
  FaMoon
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Bouton pour afficher/masquer la navbar */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* Barre latérale */}
      <nav className={`navbar ${isOpen ? "open" : "hidden"}`}>
        {/* Profil en haut */}
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <h3>Mr.Vitaliy</h3>
        </div>

        {/* Liens de navigation */}
        <ul className="nav-links">
          <li><a href="#"><FaGem className="icon" />Diamant</a></li>
          <li><a href="#"><FaRegCircle className="icon" />Cercle</a></li>
          <li><a href="#"><FaUsers className="icon" />Groupes</a></li>
          <li><a href="#"><BsHexagon className="icon" />Hexagone</a></li>
          <li><a href="#"><FaFireAlt className="icon" />Cercle de Feu</a></li>
          <li><a href="#"><FaChartBar className="icon" />Graphique</a></li>
        </ul>

        {/* Bouton pour changer le mode (sombre/clair) */}
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
