import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useCreateShowtime } from '../hooks/useShowtimes';
import { showtimeSchema, type ShowtimeFormData } from '../schemas/showtime.schema';
import { useMovies } from '../../movies/hooks/useMovies';
import { useRooms } from '../../rooms/hooks/useRooms';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { extractErrorMessage } from '../../auth/hooks/useAuth';
import { formatCurrency } from '../../../utils/date.utils';

export function CreateShowtimePage() {
  const navigate = useNavigate();
  const { mutate: createShowtime, isPending, error } = useCreateShowtime();
  const { data: movies } = useMovies();
  const { data: rooms } = useRooms();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShowtimeFormData>({
    resolver: zodResolver(showtimeSchema),
    defaultValues: { price: 0 },
  });

  const priceValue = watch('price');

  const onSubmit = (data: ShowtimeFormData) => {
    createShowtime(
      { ...data, startTime: new Date(data.startTime).toISOString() },
      { onSuccess: () => navigate('/admin/showtimes') }
    );
  };

  return (
    <div>
      <PageHeader
        title="Nueva Función"
        subtitle="Programa una función de cine"
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/showtimes')}>
            <RiArrowLeftLine className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      <div className="max-w-lg">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Movie select */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Película *
              </label>
              <select
                id="showtime-movie"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register('movieId')}
              >
                <option value="">Seleccionar película...</option>
                {movies?.map((m) => (
                  <option key={m.id} value={m.id}>{m.title} ({m.duration} min)</option>
                ))}
              </select>
              {errors.movieId && <p className="text-xs text-red-400 mt-1">{errors.movieId.message}</p>}
            </div>

            {/* Room select */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Sala *
              </label>
              <select
                id="showtime-room"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register('roomId')}
              >
                <option value="">Seleccionar sala...</option>
                {rooms?.map((r) => (
                  <option key={r.id} value={r.id}>{r.name} ({r.totalRows}×{r.totalColumns})</option>
                ))}
              </select>
              {errors.roomId && <p className="text-xs text-red-400 mt-1">{errors.roomId.message}</p>}
            </div>

            {/* Date time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Fecha y hora de inicio *
              </label>
              <input
                type="datetime-local"
                id="showtime-starttime"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register('startTime')}
              />
              {errors.startTime && <p className="text-xs text-red-400 mt-1">{errors.startTime.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Precio por entrada *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  id="showtime-price"
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register('price', { valueAsNumber: true })}
                />
              </div>
              {priceValue > 0 && (
                <p className="text-xs text-gray-500 mt-1">= {formatCurrency(priceValue)} por entrada</p>
              )}
              {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price.message}</p>}
            </div>

            {error && (
              <div role="alert" className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-sm text-red-400">
                {extractErrorMessage(error)}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isPending}
              className="w-full"
              id="create-showtime-submit"
            >
              Crear función
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
