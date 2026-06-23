import { useState } from 'react';
import { RiSearchLine, RiFilterLine } from 'react-icons/ri';
import { GENRES } from '../schemas/movie.schema';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

interface MovieFiltersProps {
  search: string;
  genre: string;
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

export function MovieFilters({ search, genre, onSearchChange, onGenreChange }: MovieFiltersProps) {
  const [showGenres, setShowGenres] = useState(false);

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <Input
        id="movie-search"
        placeholder="Buscar películas..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={<RiSearchLine className="w-4 h-4" />}
      />

      {/* Genre filter toggle (mobile) */}
      <div>
        <button
          className="md:hidden flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-3"
          onClick={() => setShowGenres((v) => !v)}
          aria-expanded={showGenres}
        >
          <RiFilterLine className="w-4 h-4" />
          Filtrar por género
        </button>

        <div className={cn(
          'flex flex-wrap gap-2',
          'md:flex', // always visible on desktop
          !showGenres && 'hidden md:flex'
        )}>
          <button
            onClick={() => onGenreChange('')}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              genre === ''
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            )}
          >
            Todos
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => onGenreChange(g === genre ? '' : g)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                genre === g
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
