import type { CellType, DesignerTool } from '../../../types/room.types';
import { cn } from '../../../utils/cn';

interface RoomCellProps {
  row: number;
  col: number;
  type: CellType;
  /** Designer mode: interactive */
  interactive?: boolean;
  /** Client mode: selection state */
  selectionState?: 'available' | 'selected' | 'reserved';
  activeTool?: DesignerTool;
  onMouseDown?: (row: number, col: number) => void;
  onMouseEnter?: (row: number, col: number) => void;
  onClick?: (row: number, col: number) => void;
}

const designerStyles: Record<CellType, string> = {
  seat: 'bg-blue-900/60 border-blue-700/50 hover:bg-blue-700/70 cursor-crosshair',
  aisle: 'bg-gray-800/40 border-gray-700/30 cursor-crosshair',
  empty: 'bg-transparent border-transparent cursor-crosshair',
};

const selectionStyles: Record<NonNullable<RoomCellProps['selectionState']>, string> = {
  available: 'bg-green-900/50 border-green-700/50 hover:bg-green-700/60 cursor-pointer hover:scale-110',
  selected: 'bg-red-600 border-red-500 cursor-pointer scale-110 shadow-lg shadow-red-600/30',
  reserved: 'bg-gray-800 border-gray-700 cursor-not-allowed opacity-50',
};

export function RoomCell({
  row,
  col,
  type,
  interactive = false,
  selectionState,
  onMouseDown,
  onMouseEnter,
  onClick,
}: RoomCellProps) {
  if (type === 'empty') {
    return (
      <div
        className={cn(
          'w-7 h-7 rounded-sm border transition-all duration-100',
          interactive ? 'border-dashed border-gray-800 cursor-crosshair hover:bg-gray-800/30' : 'border-transparent'
        )}
        onMouseDown={() => interactive && onMouseDown?.(row, col)}
        onMouseEnter={() => interactive && onMouseEnter?.(row, col)}
        aria-hidden="true"
      />
    );
  }

  if (type === 'aisle') {
    return (
      <div
        className={cn(
          'w-7 h-7 rounded-sm border transition-all duration-100',
          interactive
            ? 'bg-gray-800/40 border-gray-700/30 cursor-crosshair hover:bg-gray-700/50'
            : 'bg-gray-800/20 border-transparent'
        )}
        onMouseDown={() => interactive && onMouseDown?.(row, col)}
        onMouseEnter={() => interactive && onMouseEnter?.(row, col)}
        title={interactive ? `Pasillo (${row},${col})` : 'Pasillo'}
        aria-hidden="true"
      />
    );
  }

  // Seat cell
  if (interactive) {
    return (
      <div
        className={cn(
          'w-7 h-7 rounded-t-lg border transition-all duration-100 flex items-end justify-center',
          designerStyles.seat
        )}
        onMouseDown={() => onMouseDown?.(row, col)}
        onMouseEnter={() => onMouseEnter?.(row, col)}
        title={`Asiento (${row},${col})`}
        aria-label={`Asiento fila ${row}, columna ${col}`}
      >
        <div className="w-5 h-1 bg-blue-600/40 rounded-t-sm mb-0.5" />
      </div>
    );
  }

  // Client selection mode
  if (selectionState) {
    const isReserved = selectionState === 'reserved';
    return (
      <button
        type="button"
        className={cn(
          'w-7 h-7 rounded-t-lg border transition-all duration-150 flex items-end justify-center',
          selectionStyles[selectionState]
        )}
        onClick={() => !isReserved && onClick?.(row, col)}
        disabled={isReserved}
        title={
          selectionState === 'reserved'
            ? 'Ocupado'
            : selectionState === 'selected'
              ? 'Seleccionado — click para deseleccionar'
              : `Asiento ${row}${col}`
        }
        aria-label={`Asiento fila ${row}, columna ${col} — ${selectionState === 'reserved' ? 'ocupado' : selectionState === 'selected' ? 'seleccionado' : 'disponible'}`}
      >
        <div className={cn(
          'w-5 h-1 rounded-t-sm mb-0.5',
          selectionState === 'selected' ? 'bg-red-400' : 'bg-green-700/60'
        )} />
      </button>
    );
  }

  return null;
}
