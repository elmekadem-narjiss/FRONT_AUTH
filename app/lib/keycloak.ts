import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080", // Assure-toi qu'il n'y a pas de "/auth"
  realm: "myrealm",
  clientId: "my-nodejs-client",
};

let keycloakInstance: Keycloak | null = null;

if (typeof window !== "undefined") {
  keycloakInstance = new Keycloak(keycloakConfig);
  console.log("Keycloak instance créée:", keycloakInstance); // Debug
} else {
  console.log("Keycloak n'est pas exécuté côté client.");
}

export default keycloakInstance;
