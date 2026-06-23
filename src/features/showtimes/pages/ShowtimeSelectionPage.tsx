import { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { showtimesService } from '../services/showtimes.service';
import { Button } from '../../../components/ui/Button';
import { RiArrowLeftLine, RiTimeLine, RiTicket2Line, RiMapPinLine } from 'react-icons/ri';
import { formatDateTime } from '../../../utils/date.utils';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/ui/EmptyState';

export function ShowtimeSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  if (!movie) {
    return <Navigate to="/" replace />;
  }

  const { data: showtimes, isLoading } = useQuery({
    queryKey: ['showtimes', movie.id],
    queryFn: () => showtimesService.getByMovie(movie.id),
  });

  // FILTRO DEFENSIVO FRONTEND: Por si el usuario se queda en la pantalla 
  // mucho tiempo y alguna función expira mientras mira.
  const activeShowtimes = showtimes?.filter(
    (showtime) => new Date(showtime.startTime) > new Date()
  ) || [];

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="relative overflow-hidden border-b border-gray-800/60 bg-gray-900/50 pt-8 pb-12">
        <div 
          className="absolute inset-0 opacity-20 blur-3xl saturate-150"
          style={{ backgroundImage: `url(${movie.imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="mb-8 text-gray-400 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            Volver a la película
          </Button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="w-32 sm:w-40 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
              <img 
                src={movie.imageUrl} 
                alt={movie.title} 
                className="w-full aspect-[2/3] object-cover" 
              />
            </div>
            <div className="text-center sm:text-left pt-2">
              <Badge variant="danger" className="mb-3 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                Proceso de Reserva
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                Selecciona una función
              </h1>
              <p className="text-gray-400 text-lg font-medium">
                Película: <span className="text-white">{movie.title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 p-6 rounded-3xl h-48" />
            ))}
          </div>
        ) : activeShowtimes.length === 0 ? (
          // Usamos activeShowtimes.length aquí
          <div className="animate-scale-in">
            <EmptyState
              icon="film"
              title="Sin funciones programadas"
              description="Actualmente no hay funciones disponibles para esta película. Por favor, intenta buscar otra en la cartelera."
              action={
                <Button variant="outline" onClick={() => navigate('/')}>
                  Explorar cartelera
                </Button>
              }
            />
          </div>
        ) : (
          <div className="animate-fade-in-up stagger-children" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Horarios Disponibles</h2>
              <span className="px-4 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-sm font-semibold text-red-400 shadow-inner">
                {/* Usamos activeShowtimes.length aquí */}
                {activeShowtimes.length} {activeShowtimes.length === 1 ? 'función' : 'funciones'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Iteramos sobre activeShowtimes en lugar de showtimes */}
              {activeShowtimes.map((showtime) => (
                <div 
                  key={showtime.id} 
                  className="group flex flex-col justify-between bg-gray-900/40 backdrop-blur-md border border-gray-800/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/20 hover:bg-gray-900/80"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-xl text-white mb-1.5 flex items-center gap-2">
                          <RiMapPinLine className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
                          {showtime.room?.name || 'Sala estándar'}
                        </h3>
                        <p className="text-red-400 font-bold text-lg bg-red-500/10 w-fit px-3 py-1 rounded-lg border border-red-500/20">
                          ${showtime.price}
                        </p>
                      </div>
                      <Badge variant="default" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Disponible
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300 mb-8 bg-gray-950/50 p-3.5 rounded-2xl border border-gray-800/50">
                      <div className="bg-gray-800 p-2 rounded-xl">
                        <RiTimeLine className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="capitalize-first font-medium">
                        {formatDateTime(showtime.startTime)}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full shadow-none group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-shadow"
                    onClick={() => navigate(`/showtimes/${showtime.id}/seats`, {
                      state: {
                        price: Number(showtime.price),
                        movieTitle: movie.title,
                        startTime: showtime.startTime,
                        roomId: showtime.roomId,
                        roomName: showtime.room?.name || 'Sala estándar',
                      }
                    })}
                  >
                    <RiTicket2Line className="w-5 h-5" />
                    Elegir Asientos
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}