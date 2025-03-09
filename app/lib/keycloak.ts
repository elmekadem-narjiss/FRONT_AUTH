import Keycloak from 'keycloak-js';

console.log("✅ Keycloak.ts chargé !"); 

// Définir la configuration de Keycloak
const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'myrealm',
  clientId: 'my-nodejs-client',
});

export default keycloak;
