"use client"; // S'assurer que ce code s'exécute côté client

import { useState } from "react";
import AuthForm from "../components/AuthForm"; // Formulaire de login

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assurez-vous que la logique est correcte et que toutes les parenthèses et accolades sont fermées
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isAuthenticated ? (
          <AuthForm title="Connexion" onSubmit={() => {}} isLogin={true} /> // Fonction vide pour ne rien faire
        ) : (
          <p className="text-green-600">Connexion réussie, redirection...</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


/*
"use client"; // S'assurer que ce code s'exécute côté client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import keycloak from "../lib/keycloak"; // Importer Keycloak
import AuthForm from "../components/AuthForm"; // Formulaire de login

const LoginPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        console.log("🔹 Initialisation Keycloak...");

        const auth = await keycloak.init({
          onLoad: "check-sso",
          checkLoginIframe: false,
          pkceMethod: "S256",
        });

        if (auth) {
          console.log("✅ Utilisateur authentifié, token:", keycloak.token);

          // Stocker le token dans le localStorage
          localStorage.setItem("token", keycloak.token || "");

          // Envoyer le token au backend pour validation
          const response = await fetch("http://localhost:3000/validate-token", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          });

          if (response.ok) {
            console.log("✅ Token validé avec succès !");
            setIsAuthenticated(true);
            router.push("/dashboard");
          } else {
            throw new Error("❌ Échec de la validation du token");
          }
        }
      } catch (err: any) {
        console.error("❌ Erreur Keycloak:", err);
        setError(err.message);
      }
    };

    if (typeof window !== "undefined") {
      initializeKeycloak();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isAuthenticated ? (

        //<AuthForm title="Connexion" onSubmit={() => keycloak.login()} isLogin={true} />

          <AuthForm title="Connexion" onSubmit={() => keycloak.login()} isLogin={true} />

        ) : (
          <p className="text-green-600">Connexion réussie, redirection...</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
*/