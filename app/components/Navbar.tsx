"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // ✅ Ajout pour la redirection
import { FaBars, FaUserCircle, FaGem, FaRegCircle, FaUsers, FaFireAlt, FaChartBar, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { BsHexagon } from 'react-icons/bs';
import keycloak from '../lib/keycloak'; // Assurez-vous que ce fichier existe
import "./Navbar.css";

const Navbar = () => {
  const [isKeycloakReady, setIsKeycloakReady] = useState(false);  // Indicateur pour vérifier si Keycloak est prêt
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // Utilisation de useRouter pour la redirection

  useEffect(() => {
    console.log("🔄 Initialisation de Keycloak...");
    
    // Initialisation de Keycloak
    keycloak.init({ onLoad: 'login-required' })
      .then(authenticated => {
        if (authenticated) {
          console.log("✅ Keycloak initialisé avec succès et l'utilisateur est authentifié.");

          // Log des informations utilisateur (nom et email)
          const username = keycloak.tokenParsed?.preferred_username; // Nom d'utilisateur
          const email = keycloak.tokenParsed?.email; // Email de l'utilisateur

          console.log(`📧 Utilisateur connecté : ${username || "Non disponible"}`);
          console.log(`📧 Email : ${email || "Non disponible"}`);

          setIsKeycloakReady(true); // Keycloak est prêt, on peut interagir avec
        } else {
          console.error("❌ L'utilisateur n'est pas authentifié !");
        }
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'initialisation de Keycloak', error);
      });
  }, []);

  const handleLogout = async () => {
    if (!isKeycloakReady) {
      console.error("❌ Keycloak n'est pas encore initialisé !");
      return;
    }

    console.log("🔴 Tentative de déconnexion...");

    if (!keycloak || !keycloak.authenticated) {
      console.error("❌ Erreur: L'utilisateur n'est pas authentifié !");
      return;
    }

    try {
      await keycloak.logout();
      console.log("✅ Déconnexion réussie.");
      localStorage.removeItem("token"); // Supprime le token
      router.push("/register"); // Redirige vers la page de connexion
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      <nav className={`navbar ${isOpen ? "open" : "hidden"}`}>
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <h3>Mr.Vitaliy</h3>
        </div>

        <ul className="nav-links">
          <li><a href="#"><FaGem className="icon" />Diamant</a></li>
          <li><a href="#"><FaRegCircle className="icon" />Cercle</a></li>
          <li><a href="#"><FaUsers className="icon" />Groupes</a></li>
          <li><a href="#"><BsHexagon className="icon" />Hexagone</a></li>
          <li><a href="#"><FaFireAlt className="icon" />Cercle de Feu</a></li>
          <li><a href="#"><FaChartBar className="icon" />Graphique</a></li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Déconnexion
        </button>

        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
