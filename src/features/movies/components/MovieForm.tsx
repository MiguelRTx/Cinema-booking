import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { movieSchema, type MovieFormData, GENRES, RATINGS } from '../schemas/movie.schema';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

interface MovieFormProps {
  defaultValues?: Partial<MovieFormData>;
  onSubmit: (data: MovieFormData) => void;
  isLoading: boolean;
  submitLabel?: string;
  error?: string;
}

export function MovieForm({ defaultValues, onSubmit, isLoading, submitLabel = 'Guardar', error }: MovieFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: '',
      duration: 90,
      genre: '',
      rating: '',
      synopsis: '',
      imageUrl: '',
      ...defaultValues,
    },
  });

  const selectedGenre = watch('genre');
  const selectedRating = watch('rating');
  const imageUrl = watch('imageUrl');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <Input
            id="movie-title"
            label="Título *"
            placeholder="Nombre de la película"
            error={errors.title?.message}
            {...register('title')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Género *
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setValue('genre', g, { shouldValidate: true })}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                    selectedGenre === g
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.genre && <p className="text-xs text-red-400 mt-1">{errors.genre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Duración (minutos) *
            </label>
            <input
              type="number"
              min={1}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              {...register('duration', { valueAsNumber: true })}
            />
            {errors.duration && <p className="text-xs text-red-400 mt-1">{errors.duration.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Clasificación *
            </label>
            <div className="flex flex-wrap gap-2">
              {RATINGS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setValue('rating', r, { shouldValidate: true })}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border',
                    selectedRating === r
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating.message}</p>}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Input
            id="movie-image-url"
            label="URL del Poster *"
            placeholder="https://ejemplo.com/imagen.jpg"
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />

          {/* Image preview */}
          <div className="aspect-[2/3] w-32 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Vista previa del poster"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center p-2">
                Vista previa del poster
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Sinopsis *
            </label>
            <textarea
              rows={5}
              placeholder="Descripción de la película..."
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              {...register('synopsis')}
            />
            {errors.synopsis && <p className="text-xs text-red-400 mt-1">{errors.synopsis.message}</p>}
          </div>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
        <Button type="submit" variant="primary" size="lg" loading={isLoading} id="movie-form-submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
