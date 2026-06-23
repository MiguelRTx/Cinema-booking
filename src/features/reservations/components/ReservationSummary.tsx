import type { SeatPosition } from '../../../types/reservation.types';
import { formatCurrency } from '../../../utils/date.utils';
import { RiTicket2Line } from 'react-icons/ri';

interface ReservationSummaryProps {
  selectedSeats: SeatPosition[];
  price?: number;
  movieTitle?: string;
  startTime?: string;
  roomName?: string;
}

export function ReservationSummary({
  selectedSeats,
  price = 0,
  movieTitle,
  startTime,
  roomName,
}: ReservationSummaryProps) {
  const total = selectedSeats.length * price;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <RiTicket2Line className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold text-white">Resumen de reserva</h3>
      </div>

      {movieTitle && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Película</p>
          <p className="text-sm text-white font-medium">{movieTitle}</p>
        </div>
      )}

      {startTime && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Función</p>
          <p className="text-sm text-white">
            {new Date(startTime).toLocaleString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      )}

      {roomName && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Sala</p>
          <p className="text-sm text-white">{roomName}</p>
        </div>
      )}

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Asientos seleccionados</p>
        {selectedSeats.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Ninguno</p>
        ) : (
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedSeats.map((s) => (
              <span
                key={`${s.rowNumber}-${s.columnNumber}`}
                className="px-2 py-0.5 bg-red-900/40 border border-red-700/40 rounded text-xs text-red-300"
              >
                {String.fromCharCode(64 + s.rowNumber)}{s.columnNumber}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-800 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            {selectedSeats.length} entrada{selectedSeats.length !== 1 ? 's' : ''} × {formatCurrency(price)}
          </span>
          <span className="text-xl font-bold text-white">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
