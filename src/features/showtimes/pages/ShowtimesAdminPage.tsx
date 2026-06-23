import { useNavigate } from 'react-router-dom';
import { RiAddLine, RiCalendarScheduleLine } from 'react-icons/ri';
import { useShowtimes } from '../hooks/useShowtimes';
import { Button } from '../../../components/ui/Button';
import { PageHeader } from '../../../components/shared/PageHeader';
import { EmptyState } from '../../../components/ui/EmptyState';
import { SkeletonRow } from '../../../components/ui/SkeletonCard';
import { Badge } from '../../../components/ui/Badge';
import { formatDateTime, formatCurrency } from '../../../utils/date.utils';

export function ShowtimesAdminPage() {
  const navigate = useNavigate();
  const { data: showtimes, isLoading } = useShowtimes();

  return (
    <div>
      <PageHeader
        title="Funciones"
        subtitle="Gestiona las funciones programadas"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/admin/showtimes/create')}
            id="create-showtime-btn"
          >
            <RiAddLine className="w-4 h-4" />
            Nueva función
          </Button>
        }
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : !showtimes || showtimes.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No hay funciones programadas"
            description="Aún no se ha creado ninguna función para las películas."
            action={
              <Button variant="primary" onClick={() => navigate('/admin/showtimes/create')}>
                <RiCalendarScheduleLine className="w-4 h-4" />
                Programar función
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {showtimes.map((showtime) => {
                  // Lógica simple para ver si la función ya pasó
                  const isPast = new Date(showtime.startTime) < new Date();
                  
                  return (
                    <tr key={showtime.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-12 rounded bg-gray-800 overflow-hidden shrink-0">
                            {showtime.movie?.imageUrl && (
                              <img src={showtime.movie.imageUrl} alt={showtime.movie.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <span className="font-medium text-white text-sm">
                            {showtime.movie?.title || 'Película eliminada'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {showtime.room?.name || 'Sala eliminada'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 capitalize-first">
                        {formatDateTime(showtime.startTime)}
                      </td>
                      <td className="px-4 py-3 text-sm text-brand font-medium">
                        {formatCurrency(showtime.price)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant={isPast ? 'ghost' : 'default'}>
                          {isPast ? 'Finalizada' : 'Programada'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}