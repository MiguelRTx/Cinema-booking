import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateReservation } from '../hooks/useCreateReservation';
import { ReservationSummary } from '../components/ReservationSummary';
import { Button } from '../../../components/ui/Button';
import { RiArrowLeftLine, RiCheckLine } from 'react-icons/ri';
import { extractErrorMessage } from '../../auth/hooks/useAuth';
import type { SeatPosition } from '../../../types/reservation.types';

interface ConfirmState {
  showtimeId: string;
  selectedSeats: SeatPosition[];
  price?: number;
  movieTitle?: string;
  startTime?: string;
  roomId?: string;
  roomName?: string;
}

export function ConfirmReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ConfirmState | null;
  const { mutate: createReservation, isPending, error, isSuccess, data } = useCreateReservation();

  if (!state || !state.showtimeId) {
    navigate('/');
    return null;
  }

  if (isSuccess && data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-20 h-20 rounded-full bg-green-900/30 border border-green-700/50 flex items-center justify-center mb-6">
          <RiCheckLine className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">¡Reserva confirmada!</h1>
        <p className="text-gray-400 mb-2">ID: <code className="text-gray-300">{data.id}</code></p>
        <p className="text-gray-400 mb-8 text-sm">
          {data.reservedSeats?.length ?? state.selectedSeats.length} asiento{state.selectedSeats.length !== 1 ? 's' : ''} reservado{state.selectedSeats.length !== 1 ? 's' : ''} correctamente
        </p>
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver a la cartelera
          </Button>
          <Button variant="ghost" onClick={() => navigate('/my-reservations')}>
            Mis reservas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
        <RiArrowLeftLine className="w-4 h-4" />
        Volver a selección
      </Button>

      <h1 className="text-2xl font-bold text-white mb-6">Confirmar reserva</h1>

      <ReservationSummary
        selectedSeats={state.selectedSeats}
        price={state.price}
        movieTitle={state.movieTitle}
        startTime={state.startTime}
        roomName={state.roomName}
      />

      {error && (
        <div role="alert" className="mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800 text-sm text-red-400">
          {extractErrorMessage(error)}
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        className="w-full mt-6"
        loading={isPending}
        id="confirm-reservation-btn"
        onClick={() =>
          createReservation({
            showtimeId: state.showtimeId,
            seats: state.selectedSeats,
          })
        }
      >
        <RiCheckLine className="w-5 h-5" />
        Confirmar y pagar
      </Button>
    </div>
  );
}
