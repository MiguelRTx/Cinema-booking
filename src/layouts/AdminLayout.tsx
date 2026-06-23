import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  RiFilmLine,
  RiDashboardLine,
  RiMovieLine,
  RiBuilding4Line,
  RiCalendarScheduleLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { useAuthStore } from '../store/auth.store';
import { cn } from '../utils/cn';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: <RiDashboardLine className="w-5 h-5" /> },
  { label: 'Películas', path: '/admin/movies', icon: <RiMovieLine className="w-5 h-5" /> },
  { label: 'Salas', path: '/admin/rooms', icon: <RiBuilding4Line className="w-5 h-5" /> },
  { label: 'Funciones', path: '/admin/showtimes', icon: <RiCalendarScheduleLine className="w-5 h-5" /> },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-30',
          'transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-4 border-b border-gray-800 shrink-0">
          <RiFilmLine className="w-7 h-7 text-red-500 shrink-0" />
          {!collapsed && (
            <span className="font-bold text-white truncate">CineBook Admin</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-red-600/20 text-red-400 border border-red-700/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-3 space-y-2 shrink-0">
          {!collapsed && (
            <p className="text-xs text-gray-600 px-2 truncate">{user?.email}</p>
          )}
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-all text-sm"
          >
            <RiLogoutBoxLine className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-all text-sm"
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {collapsed ? (
              <RiMenuUnfoldLine className="w-5 h-5 shrink-0" />
            ) : (
              <>
                <RiMenuFoldLine className="w-5 h-5 shrink-0" />
                <span>Contraer</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 min-h-screen',
          collapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {/* Top bar */}
        <header className="h-16 bg-gray-900/80 border-b border-gray-800 backdrop-blur-sm flex items-center px-6 sticky top-0 z-20">
          <h2 className="text-sm text-gray-400">
            Panel de Administración
          </h2>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
