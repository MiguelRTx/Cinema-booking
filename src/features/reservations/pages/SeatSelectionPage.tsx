import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useShowtimeSeats } from '../../showtimes/hooks/useShowtimes';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { SeatMap } from '../components/SeatMap';
import { SeatLegend } from '../components/SeatLegend';
import { ReservationSummary } from '../components/ReservationSummary';
import { Button } from '../../../components/ui/Button';
import { FullPageSpinner } from '../../../components/ui/Spinner';
import { EmptyState } from '../../../components/ui/EmptyState';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

interface LocationState {
  showtimeId?: string;
  price?: number;
  movieTitle?: string;
  startTime?: string;
  roomId?: string;
  roomName?: string;
}

export function SeatSelectionPage() {
  const { id: showtimeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const { data: seatsData, isLoading, isError } = useShowtimeSeats(showtimeId!);
  const { selectedSeats, toggleSeat, canSelectMore } = useSeatSelection();

  if (isLoading) return <FullPageSpinner />;

  if (isError || !seatsData) {
    return (
      <EmptyState
        icon="inbox"
        title="Error al cargar los asientos"
        description="No se pudo obtener la disponibilidad de asientos"
        action={<Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>}
      />
    );
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    navigate('/reservations/confirm', {
      state: {
        showtimeId,
        selectedSeats,
        price: state.price,
        movieTitle: state.movieTitle,
        startTime: state.startTime,
        roomId: state.roomId,
        roomName: state.roomName,
      },
    });
  };

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
        <RiArrowLeftLine className="w-4 h-4" />
        Volver
      </Button>

      <h1 className="text-2xl font-bold text-white mb-2">Selecciona tus asientos</h1>
      <p className="text-gray-400 text-sm mb-8">
        {canSelectMore
          ? `Puedes seleccionar hasta 10 asientos`
          : '✅ Máximo de asientos alcanzado'}
      </p>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Seat map */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-auto">
            <SeatMap
              showtimeId={showtimeId!}
              roomId={state.roomId}
              seatsData={seatsData}
              selectedSeats={selectedSeats}
              onSeatToggle={toggleSeat}
            />
          </div>

          {/* Legend */}
          <div className="mt-4 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <SeatLegend />
          </div>
        </div>

        {/* Summary */}
        <div className="xl:w-72 shrink-0">
          <ReservationSummary
            selectedSeats={selectedSeats}
            price={state.price}
            movieTitle={state.movieTitle}
            startTime={state.startTime}
            roomName={state.roomName}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
            id="continue-to-confirm"
          >
            Continuar
            <RiArrowRightLine className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
