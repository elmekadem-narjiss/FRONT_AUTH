import React, { FormEvent } from "react";
import { AtSign, Lock, User } from "lucide-react";
import './styles.css';  // Assure-toi que le CSS est bien importé

interface AuthFormProps {
  title?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title = "Connexion", onSubmit, isLogin = true }) => {
  return (
    <div className="bg-image">
      <div className="form-container">
        <h3>{title}</h3> {/* Affiche le titre */}
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Nom Complet"
                required
                className="input-field pl-14 pr-4 py-3"
              />
            </div>
          )}

          <div className="relative">
            <AtSign className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
            <input
              type="email"
              placeholder="Votre Email"
              required
              className="input-field pl-14 pr-4 py-3"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
            <input
              type="password"
              placeholder="Mot de passe"
              required
              className="input-field pl-14 pr-4 py-3"
            />
          </div>

          <button type="submit" className="submit-button py-4 px-6 text-lg">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
