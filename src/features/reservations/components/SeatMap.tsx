import type { ShowtimeSeatsResponse } from '../../../types/showtime.types';
import type { SeatPosition } from '../../../types/reservation.types';
import type { CellType } from '../../../types/room.types';
import { RoomCell } from '../../rooms/components/RoomCell';

interface SeatMapProps {
  showtimeId: string;
  roomId?: string;
  seatsData: ShowtimeSeatsResponse;
  selectedSeats: SeatPosition[];
  onSeatToggle: (row: number, col: number) => void;
}

function buildReservedSet(reservedSeats: ShowtimeSeatsResponse['reservedSeats']): Set<string> {
  return new Set(reservedSeats.map((s) => `${s.row}-${s.column}`));
}

export function SeatMap({ seatsData, selectedSeats, onSeatToggle }: Omit<SeatMapProps, 'showtimeId'> & { showtimeId?: string }) {
  const { room, reservedSeats } = seatsData;
  const reservedSet = buildReservedSet(reservedSeats);
  const selectedSet = new Set(selectedSeats.map((s) => `${s.rowNumber}-${s.columnNumber}`));

  // Layout viene del backend (columna layout de la sala)
  // Parse defensivo por si llega como string serializado
  const rawLayout = room.layout;
  const savedLayout: Record<string, CellType> | null = rawLayout
    ? (typeof rawLayout === 'string' ? JSON.parse(rawLayout) : rawLayout)
    : null;

  const getCellType = (row: number, col: number): CellType => {
    if (!savedLayout) return 'seat';
    return (savedLayout[`${row}-${col}`] as CellType) ?? 'seat';
  };

  const getSelectionState = (row: number, col: number) => {
    const key = `${row}-${col}`;
    if (reservedSet.has(key)) return 'reserved' as const;
    if (selectedSet.has(key)) return 'selected' as const;
    return 'available' as const;
  };

  return (
    <div className="overflow-auto">
      {/* Screen */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-b from-white/40 to-transparent h-2 rounded-full w-3/4 max-w-sm mb-1" />
        <span className="text-xs text-gray-500 tracking-widest uppercase">Pantalla</span>
      </div>

      {/* Column headers */}
      <div className="flex gap-1.5 justify-center mb-1 pl-8">
        {Array.from({ length: room.columns }, (_, c) => (
          <div key={c} className="w-7 text-center text-xs text-gray-700">{c + 1}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-1.5 items-start mx-auto w-fit">
        {Array.from({ length: room.rows }, (_, r) => (
          <div key={r} className="flex items-center gap-1.5">
            <div className="w-7 text-right text-xs text-gray-600 pr-1 shrink-0">
              {String.fromCharCode(65 + r)}
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: room.columns }, (_, c) => {
                const row = r + 1;
                const col = c + 1;
                const cellType = getCellType(row, col);
                const selectionState = cellType === 'seat' ? getSelectionState(row, col) : undefined;

                return (
                  <RoomCell
                    key={`${row}-${col}`}
                    row={row}
                    col={col}
                    type={cellType}
                    interactive={false}
                    selectionState={selectionState}
                    onClick={onSeatToggle}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
