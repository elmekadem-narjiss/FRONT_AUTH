import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { AtSign, Lock, User } from 'lucide-react';
import './styles.css'; // Import de votre fichier CSS pour la personnalisation

interface AuthFormProps {
  title?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title = 'Authentication',
  onSubmit,
  isLogin = true
}) => {
  const [isLoginState, setIsLoginState] = useState(isLogin);

  return (
    <div className="bg-image">
      <div className="form-container">
        {/* Header avec switch entre Login et Sign Up */}
        <div className="text-center pb-8 pt-8">
          <h6 className="text-3xl font-semibold">
            {/* Lien pour se connecter */}
            <span
              onClick={() => setIsLoginState(true)}
              className={`cursor-pointer ${isLoginState ? 'text-blue-800' : ''} hover:text-blue-800 login-signup-text`}
            >
              Log In
            </span>

            {/* Ajout d'espace avec un span vide */}
            <span className="mx-4"></span>

            {/* Lien pour s'inscrire */}
            <span
              onClick={() => setIsLoginState(false)}
              className={`cursor-pointer ${!isLoginState ? 'text-blue-600' : ''} hover:text-blue-800 login-signup-text`}
            >
              Sign Up
            </span>
          </h6>
        </div>

        {/* Formulaire avec taille de texte augmentée */}
        <div className="form-text-large">
          <form onSubmit={onSubmit} className="space-y-6">
            {!isLoginState && (
              <div className="relative">
                <User className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="input-field pl-14 pr-4 py-3"
                />
              </div>
            )}

            <div className="relative">
              <AtSign className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="input-field pl-14 pr-4 py-3"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
              <input
                type="password"
                placeholder="Your Password"
                required
                className="input-field pl-14 pr-4 py-3"
              />
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="submit-button py-4 px-6 text-lg"
            >
              SUBMIT
            </button>

            {isLoginState && (
              <Link href="#" className="link mt-4">
                Forgot your password?
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
