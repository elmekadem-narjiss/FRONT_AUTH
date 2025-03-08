"use client";
import { useState } from 'react';
import Auth3DForm from '../components/AuthForm';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'authentification
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Auth3DForm 
        title="Connexion"
        onSubmit={handleSubmit}
        isLogin={true}
      />
    </div>
  );
  
};

export default LoginPage;