import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiImageLine } from 'react-icons/ri';
import { useMovies, useDeleteMovie } from '../hooks/useMovies';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { PageHeader } from '../../../components/shared/PageHeader';
import { SkeletonRow } from '../../../components/ui/SkeletonCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatDuration } from '../../../utils/date.utils';
import type { Movie } from '../../../types/movie.types';

export function MoviesAdminPage() {
  const navigate = useNavigate();
  const { data: movies, isLoading } = useMovies();
  const { mutate: deleteMovie, isPending: isDeleting } = useDeleteMovie();
  const [deleteTarget, setDeleteTarget] = useState<Movie | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteMovie(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <div>
      <PageHeader
        title="Películas"
        subtitle="Gestiona el catálogo de películas"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/admin/movies/create')}
            id="create-movie-btn"
          >
            <RiAddLine className="w-4 h-4" />
            Nueva película
          </Button>
        }
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : !movies || movies.length === 0 ? (
          <EmptyState
            icon="film"
            title="No hay películas"
            description="Crea tu primera película para comenzar"
            action={
              <Button variant="primary" onClick={() => navigate('/admin/movies/create')}>
                <RiAddLine className="w-4 h-4" />
                Nueva película
              </Button>
            }
          />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Género</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Duración</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 rounded-md overflow-hidden shrink-0 bg-gray-800">
                        {movie.imageUrl ? (
                          <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <RiImageLine className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">{movie.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{movie.synopsis?.slice(0, 60)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge variant="default">{movie.genre}</Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-400">
                    {formatDuration(movie.duration)}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-gray-400">
                    {movie.rating}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/movies/${movie.id}/edit`)}
                        aria-label={`Editar ${movie.title}`}
                      >
                        <RiEditLine className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteTarget(movie)}
                        aria-label={`Eliminar ${movie.title}`}
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Eliminar película"
        size="sm"
      >
        <p className="text-gray-300 mb-6">
          ¿Estás seguro de que deseas eliminar{' '}
          <strong className="text-white">"{deleteTarget?.title}"</strong>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            loading={isDeleting}
            id="confirm-delete-movie"
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
