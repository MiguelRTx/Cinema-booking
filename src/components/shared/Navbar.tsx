import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RiFilmLine, RiUserLine, RiLogoutBoxLine, RiMenuLine, RiCloseLine, RiTicket2Line } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled ? 'bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/60 shadow-xl' : 'bg-transparent border-b border-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-2xl text-white group"
          >
            <div className="bg-red-600/10 p-2 rounded-xl group-hover:bg-red-600/20 transition-colors">
              <RiFilmLine className="w-7 h-7 text-red-500" />
            </div>
            <span className="tracking-tight">CineBook</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-white',
                location.pathname === '/' ? 'text-white' : 'text-gray-400'
              )}
            >
              Cartelera
            </Link>

            {isAuthenticated && user?.role === 'CLIENT' && (
              <Link
                to="/my-reservations"
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors hover:text-white',
                  location.pathname === '/my-reservations' ? 'text-white' : 'text-gray-400'
                )}
              >
                <RiTicket2Line className="w-4 h-4" />
                Mis Reservas
              </Link>
            )}

            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-white',
                  location.pathname.startsWith('/admin') ? 'text-white' : 'text-gray-400'
                )}
              >
                Panel Admin
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-5 pl-4 border-l border-gray-800">
                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <RiUserLine className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="max-w-[150px] truncate">{user?.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-red-400 hover:bg-red-950/30">
                  <RiLogoutBoxLine className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Iniciar sesión
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')} className="shadow-red-600/20">
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <RiCloseLine className="w-7 h-7" /> : <RiMenuLine className="w-7 h-7" />}
          </button>
        </div>

        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[400px] opacity-100 mb-4' : 'max-h-0 opacity-0'
        )}>
          <div className="flex flex-col gap-1.5 p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50 backdrop-blur-xl">
            <Link to="/" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50">
              Cartelera
            </Link>
            {isAuthenticated && user?.role === 'CLIENT' && (
              <Link to="/my-reservations" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center gap-2">
                <RiTicket2Line className="w-4 h-4" /> Mis Reservas
              </Link>
            )}
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50">
                Panel Admin
              </Link>
            )}
            
            <div className="h-px bg-gray-800/50 my-2" />
            
            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/30 text-left">
                <RiLogoutBoxLine className="w-4 h-4" /> Cerrar sesión
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-1">
                <Button variant="ghost" className="w-full justify-center" onClick={() => navigate('/login')}>
                  Iniciar sesión
                </Button>
                <Button variant="primary" className="w-full justify-center" onClick={() => navigate('/register')}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}