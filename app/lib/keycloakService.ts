import keycloak from './keycloak'; // Importer l'instance Keycloak

// Fonction pour récupérer les rôles de l'utilisateur
const getUserRoles = () => {
  if (keycloak.tokenParsed && keycloak.tokenParsed.realm_access) {
    return keycloak.tokenParsed.realm_access.roles || []; // Retourner les rôles de l'utilisateur si disponibles
  } else {
    console.error('Token ou realm_access non trouvé');
    return [];  // Retourner un tableau vide si aucun rôle n'est trouvé
  }
};

// Fonction principale pour vérifier l'accès à une route
const hasAccessToRoute = (requiredRole: string) => {
  // Vérifier si Keycloak est bien initialisé et si le token est disponible
  if (!keycloak || !keycloak.tokenParsed) {
    console.error('Keycloak n\'est pas initialisé ou le token est manquant');
    return false;
  }

  // Récupérer les rôles de l'utilisateur depuis le token Keycloak
  const roles = getUserRoles();

  console.log('Rôles de l\'utilisateur:', roles);  // Affiche les rôles de l'utilisateur pour le débogage

  // Vérifier si l'utilisateur a le rôle requis
  return roles.includes(requiredRole);
};

export { getUserRoles, hasAccessToRoute }; // Exporte les deux fonctions correctement
