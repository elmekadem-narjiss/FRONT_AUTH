"use client"; // Assurer l'exécution côté client

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import keycloak from "../lib/keycloak"; // Import Keycloak
import AuthForm from "../components/AuthForm"; // Formulaire de login

console.log("Keycloak importé dans LoginPage:", keycloak); // Debug

const LoginPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        console.log("Initialisation Keycloak...", keycloak); // Debug

        if (!keycloak) {
          throw new Error("Keycloak est null.");
        }

        const auth = await keycloak.init({ onLoad: "check-sso" });

        console.log("Keycloak auth:", auth); // Debug

        if (auth) {
          setIsAuthenticated(true);
          localStorage.setItem("token", keycloak.token || "");
          router.push("/dashboard");
        }
      } catch (err: any) {
        console.error("Erreur Keycloak:", err);
        setError(err.message);
      }
    };

    if (typeof window !== "undefined") {
      initializeKeycloak();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      {error && <p className="text-red-500">{error}</p>}
      {!isAuthenticated ? (
        <AuthForm title="Connexion" onSubmit={() => keycloak?.login()} isLogin={true} />
      ) : (
        <p>Connexion réussie, redirection...</p>
      )}
    </div>
  );
};

export default LoginPage;
