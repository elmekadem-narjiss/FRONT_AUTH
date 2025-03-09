"use client"; // Assurer l'exécution côté client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import keycloak from "../lib/keycloak"; // Import Keycloak
import AuthForm from "../components/AuthForm"; // Formulaire de login

console.log("✅ Keycloak importé dans LoginPage:", keycloak); // Debug

const LoginPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        console.log("🔹 Initialisation Keycloak...", keycloak); // Debug

        if (!keycloak) {
          throw new Error("❌ Keycloak est null.");
        }

        const auth = await keycloak.init({ 
          onLoad: "check-sso",  
          checkLoginIframe: false, 
          pkceMethod: "S256" 
        });

        console.log("✅ Keycloak auth:", auth); // Debug

        if (auth) {
          console.log("✅ Utilisateur authentifié, token:", keycloak.token);
          setIsAuthenticated(true);
          localStorage.setItem("token", keycloak.token || "");
          router.push("/dashboard");
        }
      } catch (err: any) {
        console.error("❌ Erreur Keycloak:", err);
        setError(err.message);
      }
    };

    if (typeof window !== "undefined") {
      console.log("🔹 Exécution de initializeKeycloak()");
      initializeKeycloak();
    } else {
      console.log("⚠️ Code exécuté côté serveur, Keycloak ne peut pas être initialisé.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isAuthenticated ? (
          <AuthForm title="Connexion" onSubmit={() => keycloak?.login()} isLogin={true} />
        ) : (
          <p className="text-green-600">Connexion réussie, redirection...</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
