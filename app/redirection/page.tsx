"use client";
import React from 'react';
import ProtectedRoute from '../lib/ProtectedRoute'; // Importer le composant de protection de route

const AdminPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">  {/* Passez "admin" comme rôle requis */}
      <div>
        <h1>Bienvenue dans l'espace Admin</h1>
        {/* Contenu de l'admin */}
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
