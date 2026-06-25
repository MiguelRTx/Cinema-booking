import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiEditLine, RiPaintBrushLine, RiBuilding4Line } from 'react-icons/ri';
import { useRooms} from '../hooks/useRooms';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { EmptyState } from '../../../components/ui/EmptyState';

export function RoomsPage() {
  const navigate = useNavigate();
  const { data: rooms, isLoading } = useRooms();
  return (
    <div>
      <PageHeader
        title="Salas"
        subtitle="Gestiona las salas del cine"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/admin/rooms/create')}
            id="create-room-btn"
          >
            <RiAddLine className="w-4 h-4" />
            Nueva sala
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse">
              <div className="h-5 bg-gray-800 rounded w-1/2 mb-3" />
              <div className="h-3 bg-gray-800 rounded w-1/3" />
            </div>
          ))
        ) : !rooms || rooms.length === 0 ? (
          <div className="col-span-3">
            <EmptyState
              icon="inbox"
              title="No hay salas"
              description="Crea la primera sala del cine"
              action={
                <Button variant="primary" onClick={() => navigate('/admin/rooms/create')}>
                  <RiAddLine className="w-4 h-4" />
                  Nueva sala
                </Button>
              }
            />
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-900/20 rounded-lg border border-red-800/30">
                    <RiBuilding4Line className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{room.name}</h3>
                    <p className="text-xs text-gray-500">
                      {room.totalRows} × {room.totalColumns} = {room.totalRows * room.totalColumns} celdas
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual mini grid preview */}
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div
                  className="grid gap-0.5 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(room.totalColumns, 20)}, 1fr)`,
                    maxWidth: '100%',
                  }}
                >
                  {Array.from({ length: Math.min(room.totalRows * room.totalColumns, 80) }).map((_, i) => (
                    <div key={i} className="aspect-square bg-blue-900/40 rounded-sm" />
                  ))}
                </div>
                {room.totalRows * room.totalColumns > 80 && (
                  <p className="text-xs text-gray-600 text-center mt-1">Vista previa parcial</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/rooms/${room.id}/edit`)}
                  className="flex-1"
                >
                  <RiPaintBrushLine className="w-4 h-4" />
                  Diseñar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/admin/rooms/${room.id}/edit`)}
                  aria-label={`Editar ${room.name}`}
                >
                  <RiEditLine className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
