import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useMovie, useUpdateMovie } from '../hooks/useMovies';
import { MovieForm } from '../components/MovieForm';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { EmptyState } from '../../../components/ui/EmptyState';
import { extractErrorMessage } from '../../auth/hooks/useAuth';

export function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError } = useMovie(id!);
  const { mutate: updateMovie, isPending, error } = useUpdateMovie(id!);

  if (isLoading) return <FullPageSpinner />;
  if (isError || !movie) {
    return (
      <EmptyState
        icon="film"
        title="Película no encontrada"
        action={<Button variant="primary" onClick={() => navigate('/admin/movies')}>Volver</Button>}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={`Editar: ${movie.title}`}
        subtitle="Modifica los datos de la película"
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/movies')}>
            <RiArrowLeftLine className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <MovieForm
          defaultValues={{
            title: movie.title,
            duration: movie.duration,
            genre: movie.genre,
            rating: movie.rating,
            synopsis: movie.synopsis,
            imageUrl: movie.imageUrl,
          }}
          onSubmit={(data) =>
            updateMovie(data, { onSuccess: () => navigate('/admin/movies') })
          }
          isLoading={isPending}
          submitLabel="Guardar cambios"
          error={error ? extractErrorMessage(error) : undefined}
        />
      </div>
    </div>
  );
}
