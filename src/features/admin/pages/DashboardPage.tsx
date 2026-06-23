import { useMovies } from '../../movies/hooks/useMovies';
import { useRooms } from '../../rooms/hooks/useRooms';
import { useShowtimes } from '../../showtimes/hooks/useShowtimes'; // 1. Importamos el hook
import { RiMovieLine, RiBuilding4Line, RiCalendarScheduleLine, RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  onClick?: () => void;
}

function StatCard({ icon, label, value, color, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 border border-gray-800 rounded-xl p-6 ${onClick ? 'cursor-pointer hover:border-gray-700 transition-colors' : ''}`}
    >
      <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // 2. Ejecutamos las peticiones
  const { data: movies } = useMovies();
  const { data: rooms } = useRooms();
  const { data: showtimes } = useShowtimes(); // Obtenemos las funciones

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, <span className="text-red-400">{user?.email?.split('@')[0]}</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Panel de administración de CineBook</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={<RiMovieLine className="w-6 h-6 text-red-400" />}
          label="Películas en catálogo"
          value={movies?.length ?? '—'}
          color="bg-red-900/20 border border-red-800/30"
          onClick={() => navigate('/admin/movies')}
        />
        <StatCard
          icon={<RiBuilding4Line className="w-6 h-6 text-blue-400" />}
          label="Salas configuradas"
          value={rooms?.length ?? '—'}
          color="bg-blue-900/20 border border-blue-800/30"
          onClick={() => navigate('/admin/rooms')}
        />
        <StatCard
          icon={<RiCalendarScheduleLine className="w-6 h-6 text-amber-400" />}
          label="Funciones programadas"
          value={showtimes?.length ?? '—'} // 3. Pasamos el total dinámico
          color="bg-amber-900/20 border border-amber-800/30"
          onClick={() => navigate('/admin/showtimes')}
        />
      </div>

      {/* Quick actions */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Nueva película', path: '/admin/movies/create', icon: <RiMovieLine className="w-5 h-5" /> },
            { label: 'Nueva sala', path: '/admin/rooms/create', icon: <RiBuilding4Line className="w-5 h-5" /> },
            { label: 'Nueva función', path: '/admin/showtimes/create', icon: <RiCalendarScheduleLine className="w-5 h-5" /> },
          ].map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-red-700/50 hover:bg-red-900/10 transition-all text-left group"
            >
              <div className="text-gray-500 group-hover:text-red-400 transition-colors">
                {action.icon}
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-medium">
                {action.label}
              </span>
              <RiAddLine className="w-4 h-4 ml-auto text-gray-700 group-hover:text-gray-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}