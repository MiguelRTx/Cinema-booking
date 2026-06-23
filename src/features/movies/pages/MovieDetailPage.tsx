import { useEffect } from 'react'; // 1. Importamos useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { useMovie } from '../hooks/useMovies';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatDuration } from '../../../utils/date.utils';
import { useAuthStore } from '../../../store/auth.store';
import {
  RiTimeLine,
  RiArrowLeftLine,
  RiTicket2Line,
  RiFilmLine,
  RiUserLine,
} from 'react-icons/ri';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { data: movie, isLoading, isError } = useMovie(id!);

  // 2. AGREGAMOS ESTE EFECTO PARA REINICIAR EL SCROLL
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
          <div className="w-full md:w-80 shrink-0 bg-gray-800/60 rounded-2xl aspect-[2/3] shadow-2xl border border-gray-700/50" />
          <div className="flex-1 space-y-6 pt-4 md:pt-12">
            <div className="h-12 bg-gray-800/60 rounded-xl w-3/4" />
            <div className="flex gap-3">
              <div className="h-8 w-24 bg-gray-800/60 rounded-full" />
              <div className="h-8 w-20 bg-gray-800/60 rounded-full" />
            </div>
            <div className="pt-6 space-y-4">
              <div className="h-4 bg-gray-800/60 rounded-md w-full" />
              <div className="h-4 bg-gray-800/60 rounded-md w-full" />
              <div className="h-4 bg-gray-800/60 rounded-md w-5/6" />
              <div className="h-4 bg-gray-800/60 rounded-md w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 animate-scale-in">
        <EmptyState
          icon="film"
          title="Película no encontrada"
          description="La película que buscas no existe o ha sido retirada de la cartelera."
          action={
            <Button variant="outline" onClick={() => navigate('/')}>
              <RiArrowLeftLine className="w-4 h-4" />
              Volver a la cartelera
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div
        className="relative h-[45vh] md:h-[55vh] min-h-[400px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 md:-mt-56 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 text-gray-400 hover:text-white hover:bg-gray-900/50 backdrop-blur-sm"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Volver
        </Button>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          <div className="w-56 md:w-72 lg:w-80 shrink-0 self-start group animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-700/50 ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src={movie.imageUrl}
                alt={`Poster de ${movie.title}`}
                className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1a1a2e/e94560?text=${encodeURIComponent(movie.title)}`;
                }}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-2 md:pt-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="danger" className="px-3 py-1 text-sm shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                {movie.rating}
              </Badge>
              <Badge variant="default" className="px-3 py-1 text-sm bg-gray-800/80 backdrop-blur-sm border-gray-700">
                {movie.genre}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-base font-medium text-gray-300 mb-8 bg-gray-900/40 w-fit px-5 py-2.5 rounded-xl border border-gray-800/60 backdrop-blur-md">
              <span className="flex items-center gap-2">
                <RiTimeLine className="w-5 h-5 text-red-400" />
                {formatDuration(movie.duration)}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
              <span className="flex items-center gap-2">
                <RiFilmLine className="w-5 h-5 text-amber-400" />
                {movie.genre}
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-red-500" />
                Sinopsis
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                {movie.synopsis}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  id="movie-reserve-btn"
                  onClick={() => navigate('/showtimes/select', { state: { movie } })}
                  className="px-8"
                >
                  <RiTicket2Line className="w-6 h-6" />
                  Ver Funciones y Reservar
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  id="movie-login-btn"
                  onClick={() => navigate('/login')}
                  className="px-8 bg-gray-900/50 backdrop-blur-sm"
                >
                  <RiUserLine className="w-5 h-5" />
                  Inicia sesión para reservar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}