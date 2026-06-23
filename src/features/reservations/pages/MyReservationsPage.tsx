import { useNavigate } from 'react-router-dom';
import { RiFilmLine, RiTicket2Line, RiMapPinLine, RiCalendarCheckLine } from 'react-icons/ri';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Button } from '../../../components/ui/Button';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { useMyReservations } from '../hooks/useMyReservations';
import { formatDateTime, formatCurrency } from '../../../utils/date.utils';

export function MyReservationsPage() {
  const navigate = useNavigate();
  const { data: reservations, isLoading, isError } = useMyReservations();

  if (isLoading) return <FullPageSpinner />;

  if (isError) {
    return (
      <EmptyState
        icon="inbox"
        title="Error al cargar reservas"
        description="Ocurrió un problema al obtener tus reservas."
        action={<Button variant="ghost" onClick={() => navigate(0)}>Reintentar</Button>}
      />
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Mis Reservas</h1>
        <EmptyState
          icon="inbox"
          title="Sin reservas aún"
          description="No tienes reservas registradas en este momento. Explora la cartelera y reserva tus entradas."
          action={
            <Button variant="primary" onClick={() => navigate('/')}>
              <RiFilmLine className="w-4 h-4" />
              Ver cartelera
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold text-white mb-8">Mis Reservas</h1>
      
      <div className="space-y-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
            {reservation.showtime?.movie?.imageUrl && (
              <div className="md:w-48 h-48 md:h-auto shrink-0 bg-gray-800">
                <img 
                  src={reservation.showtime.movie.imageUrl} 
                  alt={reservation.showtime.movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {reservation.showtime?.movie?.title || 'Película desconocida'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <RiCalendarCheckLine className="text-red-400 w-4 h-4" />
                    <span className="capitalize-first">
                      {reservation.showtime ? formatDateTime(reservation.showtime.startTime) : 'Fecha no disponible'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <RiMapPinLine className="text-red-400 w-4 h-4" />
                    <span>{reservation.showtime?.room?.name || 'Sala estándar'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <RiTicket2Line className="text-red-400 w-4 h-4" />
                    <span>
                      {reservation.reservedSeats.length} entrada{reservation.reservedSeats.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider self-center mr-2">Asientos:</span>
                  {reservation.reservedSeats.map((seat) => (
                    <span 
                      key={seat.id}
                      className="px-2 py-1 bg-gray-800 rounded text-xs font-medium text-white border border-gray-700"
                    >
                      {String.fromCharCode(64 + seat.rowNumber)}{seat.columnNumber}
                    </span>
                  ))}
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Total Pagado</span>
                  <span className="text-xl font-bold text-white">
                    {formatCurrency(reservation.reservedSeats.length * Number(reservation.showtime?.price || 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
