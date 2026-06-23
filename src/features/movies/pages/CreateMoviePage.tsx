import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useCreateMovie } from '../hooks/useMovies';
import { MovieForm } from '../components/MovieForm';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { extractErrorMessage } from '../../auth/hooks/useAuth';

export function CreateMoviePage() {
  const navigate = useNavigate();
  const { mutate: createMovie, isPending, error } = useCreateMovie();

  return (
    <div>
      <PageHeader
        title="Nueva Película"
        subtitle="Agrega una nueva película al catálogo"
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/movies')}>
            <RiArrowLeftLine className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <MovieForm
          onSubmit={(data) =>
            createMovie(data, { onSuccess: () => navigate('/admin/movies') })
          }
          isLoading={isPending}
          submitLabel="Crear película"
          error={error ? extractErrorMessage(error) : undefined}
        />
      </div>
    </div>
  );
}
