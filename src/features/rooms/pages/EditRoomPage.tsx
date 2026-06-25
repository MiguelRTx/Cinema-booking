import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiArrowLeftLine, RiSave3Line, RiPaintBrushLine, RiSettings4Line } from 'react-icons/ri';
import { useRoom, useUpdateRoom, useUpdateRoomLayout } from '../hooks/useRooms';
import { roomSchema, type RoomFormData } from '../schemas/room.schema';
import { RoomDesigner } from '../components/RoomDesigner';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { cn } from '../../../utils/cn';

type Tab = 'design' | 'settings';

export function EditRoomPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: room, isLoading } = useRoom(id!);
  const { mutate: updateRoom, isPending } = useUpdateRoom(id!);
  const { mutate: updateLayout } = useUpdateRoomLayout(id!);
  const [activeTab, setActiveTab] = useState<Tab>('design');
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    values: room
      ? { name: room.name, totalRows: room.totalRows, totalColumns: room.totalColumns }
      : undefined,
  });

  if (isLoading) return <FullPageSpinner />;
  if (!room) {
    return (
      <div className="text-gray-400 p-6">Sala no encontrada.</div>
    );
  }

  const onSettingsSubmit = (data: RoomFormData) => {
    updateRoom(data, { onSuccess: () => navigate('/admin/rooms') });
  };

  return (
    <div>
      <PageHeader
        title={room.name}
        subtitle={`${room.totalRows} filas × ${room.totalColumns} columnas`}
        actions={
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/rooms')}>
            <RiArrowLeftLine className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1 w-fit mb-6">
        <button
          onClick={() => setActiveTab('design')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'design'
              ? 'bg-red-600 text-white shadow'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <RiPaintBrushLine className="w-4 h-4" />
          Diseño de sala
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
            activeTab === 'settings'
              ? 'bg-red-600 text-white shadow'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <RiSettings4Line className="w-4 h-4" />
          Configuración
        </button>
      </div>

      {/* Tab panels */}
      {activeTab === 'design' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          {saved && (
            <div className="mb-4 p-3 bg-green-950/50 border border-green-800 rounded-lg text-sm text-green-400 flex items-center gap-2">
              ✅ Diseño guardado correctamente en este dispositivo
            </div>
          )}
          <RoomDesigner
            roomId={room.id}
            rows={room.totalRows}
            cols={room.totalColumns}
            initialLayout={room.layout}
            onSaved={(cells) => {
              updateLayout(cells);
              setSaved(true);
            }}
          />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md">
          <form onSubmit={handleSubmit(onSettingsSubmit)} className="space-y-5">
            <Input
              id="edit-room-name"
              label="Nombre de la sala *"
              error={errors.name?.message}
              {...register('name')}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Filas *</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register('totalRows', { valueAsNumber: true })}
                />
                {errors.totalRows && <p className="text-xs text-red-400 mt-1">{errors.totalRows.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Columnas *</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register('totalColumns', { valueAsNumber: true })}
                />
                {errors.totalColumns && <p className="text-xs text-red-400 mt-1">{errors.totalColumns.message}</p>}
              </div>
            </div>
            <Button type="submit" variant="primary" loading={isPending} id="update-room-submit">
              <RiSave3Line className="w-4 h-4" />
              Guardar cambios
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
