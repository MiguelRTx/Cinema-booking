import { useState, useEffect } from 'react';
import { useMovies } from '../hooks/useMovies';
import { MovieGrid } from '../components/MovieGrid';
import { MovieFilters } from '../components/MovieFilters';
import { SkeletonCard } from '../../../components/ui/SkeletonCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { RiFilmLine } from 'react-icons/ri';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function BillboardPage() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data: movies, isLoading, isError } = useMovies({
    search: debouncedSearch || undefined,
    genre: genre || undefined,
  });

  const hasFilters = debouncedSearch || genre;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative overflow-hidden border-b border-gray-800/60 bg-gray-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center flex flex-col items-center animate-fade-in-up">
          <div className="bg-red-500/10 p-4 rounded-2xl mb-6 ring-1 ring-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <RiFilmLine className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight">
            Descubre la Magia del Cine
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Explora los estrenos más esperados, encuentra tus géneros favoritos y asegura tu asiento en la mejor sala de la ciudad.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <MovieFilters
            search={search}
            genre={genre}
            onSearchChange={setSearch}
            onGenreChange={setGenre}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="animate-scale-in">
            <EmptyState
              icon="film"
              title="Error de conexión"
              description="No pudimos cargar la cartelera. Por favor, verifica tu conexión e intenta nuevamente."
            />
          </div>
        ) : !movies || movies.length === 0 ? (
          <div className="animate-scale-in">
            <EmptyState
              icon={hasFilters ? 'search' : 'film'}
              title={hasFilters ? 'Ninguna película coincide' : 'Cartelera en actualización'}
              description={
                hasFilters
                  ? 'Intenta con otras palabras clave o elimina los filtros de género.'
                  : 'Estamos preparando los próximos estrenos. ¡Vuelve pronto!'
              }
            />
          </div>
        ) : (
          <div className="animate-fade-in-up stagger-children" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">En Cartelera</h2>
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm font-medium text-gray-400">
                {movies.length} {movies.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
            <MovieGrid movies={movies} />
          </div>
        )}
      </div>
    </div>
  );
}