import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasAccessToRoute } from './keycloakService'; // Importer la fonction de vérification des rôles

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;  // Utiliser 'requiredRole' comme paramètre pour indiquer le rôle requis
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true); // Ajouter un état pour gérer le chargement
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // Router pour la redirection si nécessaire

  useEffect(() => {
    const checkAccess = async () => {
      const hasAccess = await hasAccessToRoute(requiredRole);
      if (!hasAccess) {
        setMessage('Accès refusé');
      //  router.push("/unauthorized");  // Rediriger l'utilisateur vers la page d'unauthorized
      }
      setLoading(false); // Terminer le chargement après la vérification
    };

    checkAccess();
  }, [requiredRole, router]);

  if (loading) {
    return <p>Chargement...</p>; // Afficher un message de chargement pendant que l'on vérifie l'accès
  }

  return (
    <div>
      {message ? (
        <p>{message}</p>
      ) : (
        <>{children}</>  // Afficher les enfants si l'utilisateur a accès
      )}
    </div>
  );
};

export default ProtectedRoute;
