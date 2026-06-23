import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useCreateRoom } from '../hooks/useRooms';
import { roomSchema, type RoomFormData } from '../schemas/room.schema';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { extractErrorMessage } from '../../auth/hooks/useAuth';

export function CreateRoomPage() {
  const navigate = useNavigate();
  const { mutate: createRoom, isPending, error } = useCreateRoom();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: { name: '', totalRows: 8, totalColumns: 12 },
  });

  const onSubmit = (data: RoomFormData) => {
    createRoom(data, {
      onSuccess: (room) => {
        // Redirect to edit/design page
        navigate(`/admin/rooms/${room.id}/edit`);
      },
    });
  };

  return (
    <div>
      <PageHeader
        title="Nueva Sala"
        subtitle="Define las dimensiones y luego personaliza el diseño"
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/rooms')}>
            <RiArrowLeftLine className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      <div className="max-w-lg">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="room-name"
              label="Nombre de la sala *"
              placeholder="Ej: Sala 1, Sala VIP, IMAX..."
              error={errors.name?.message}
              {...register('name')}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Filas (1–30) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register('totalRows', { valueAsNumber: true })}
                />
                {errors.totalRows && (
                  <p className="text-xs text-red-400 mt-1">{errors.totalRows.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Columnas (1–30) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register('totalColumns', { valueAsNumber: true })}
                />
                {errors.totalColumns && (
                  <p className="text-xs text-red-400 mt-1">{errors.totalColumns.message}</p>
                )}
              </div>
            </div>

            <div className="p-3 bg-blue-950/30 border border-blue-800/30 rounded-lg">
              <p className="text-xs text-blue-400">
                💡 Después de crear la sala podrás personalizar el diseño: quitar asientos, agregar pasillos, definir formas personalizadas.
              </p>
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
              id="create-room-submit"
            >
              Crear sala y diseñar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
