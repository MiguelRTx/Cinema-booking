import { Link } from 'react-router-dom';
import { RiFilmLine } from 'react-icons/ri';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background decorative gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-6">
              <RiFilmLine className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold text-white">CineBook</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Crear cuenta</h1>
            <p className="text-gray-400 text-sm mt-1">Únete y reserva tus películas favoritas</p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
