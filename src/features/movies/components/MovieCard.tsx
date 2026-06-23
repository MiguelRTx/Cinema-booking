import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../../types/movie.types';
import { Badge } from '../../../components/ui/Badge';
import { formatDuration } from '../../../utils/date.utils';
import { RiTimeLine, RiStarLine } from 'react-icons/ri';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer
                 transition-all duration-300 hover:border-red-700/50 hover:shadow-2xl hover:shadow-red-900/20
                 hover:-translate-y-1"
      aria-label={`Ver detalles de ${movie.title}`}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3] bg-gray-800">
        <img
          src={movie.imageUrl}
          alt={`Poster de ${movie.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/300x450/1a1a2e/e94560?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Rating badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-gray-900/80 backdrop-blur-sm text-xs">
            {movie.rating}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h2 className="font-semibold text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-red-300 transition-colors">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <RiTimeLine className="w-3.5 h-3.5" />
            <span>{formatDuration(movie.duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <RiStarLine className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

        <div className="mt-2">
          <Badge variant="default" className="text-xs">
            {movie.genre}
          </Badge>
        </div>
      </div>
    </article>
  );
}
