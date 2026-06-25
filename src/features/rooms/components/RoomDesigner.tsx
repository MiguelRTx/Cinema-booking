import { useEffect } from 'react';
import type { CellType, DesignerTool } from '../../../types/room.types';
import { useRoomDesigner } from '../hooks/useRoomDesigner';
import { RoomCell } from './RoomCell';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import {
  RiSave3Line,
  RiRefreshLine,
  RiLayoutGridLine,
  RiSubtractLine,
  RiCloseLine,
} from 'react-icons/ri';

interface RoomDesignerProps {
  roomId: string;
  rows: number;
  cols: number;
  initialLayout?: Record<string, CellType> | null;
  onSaved?: (cells: Record<string, CellType>) => void;
}

const tools: { id: DesignerTool; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'seat',
    label: 'Asiento',
    icon: <RiLayoutGridLine className="w-4 h-4" />,
    description: 'Click o arrastra para agregar asientos',
  },
  {
    id: 'aisle',
    label: 'Pasillo',
    icon: <RiSubtractLine className="w-4 h-4" />,
    description: 'Click o arrastra para dibujar pasillos',
  },
  {
    id: 'empty',
    label: 'Vacío',
    icon: <RiCloseLine className="w-4 h-4" />,
    description: 'Click o arrastra para quitar espacio',
  },
];

export function RoomDesigner({ roomId, rows, cols, initialLayout, onSaved }: RoomDesignerProps) {
  const designer = useRoomDesigner({ roomId, rows, cols, initialLayout });

  // Global mouseup to stop painting even if released outside grid
  useEffect(() => {
    const handler = () => designer.onMouseUp();
    window.addEventListener('mouseup', handler);
    return () => window.removeEventListener('mouseup', handler);
  }, [designer]);

  const handleSave = () => {
    designer.save();
    onSaved?.(designer.cells);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Tool selector */}
        <div className="flex gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => designer.setActiveTool(tool.id)}
              title={tool.description}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                designer.activeTool === tool.id
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
              )}
            >
              {tool.icon}
              {tool.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={designer.resetToDefault}>
            <RiRefreshLine className="w-4 h-4" />
            Reiniciar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} id="save-room-layout">
            <RiSave3Line className="w-4 h-4" />
            Guardar diseño
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-900/60 border border-blue-700/50" />
          <span className="text-gray-400">Asientos: <strong className="text-white">{designer.stats.seats}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-800/40 border border-gray-700/30" />
          <span className="text-gray-400">Pasillos: <strong className="text-white">{designer.stats.aisles}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-dashed border-gray-700" />
          <span className="text-gray-400">Vacíos: <strong className="text-white">{designer.stats.empty}</strong></span>
        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 italic">
        Herramienta activa: <strong className="text-gray-300">{tools.find(t => t.id === designer.activeTool)?.label}</strong> — {tools.find(t => t.id === designer.activeTool)?.description}
      </p>

      {/* Grid */}
      <div
        className="overflow-auto pb-4"
        onMouseLeave={() => designer.onMouseUp()}
      >
        {/* Screen indicator */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-b from-white/30 to-transparent h-2 rounded-full w-3/4 max-w-xs" />
        </div>
        <div className="flex justify-center mb-2">
          <span className="text-xs text-gray-600 tracking-widest uppercase">Pantalla</span>
        </div>

        {/* Column headers */}
        <div className="flex gap-1 justify-center mb-1 pl-8">
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} className="w-7 text-center text-xs text-gray-700">
              {c + 1}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-1 items-start mx-auto w-fit">
          {Array.from({ length: rows }, (_, r) => (
            <div key={r} className="flex items-center gap-1">
              {/* Row label */}
              <div className="w-7 text-right text-xs text-gray-700 pr-1 shrink-0">
                {String.fromCharCode(65 + r)}
              </div>
              {/* Cells */}
              <div className="flex gap-1">
                {Array.from({ length: cols }, (_, c) => (
                  <RoomCell
                    key={`${r + 1}-${c + 1}`}
                    row={r + 1}
                    col={c + 1}
                    type={designer.getCellType(r + 1, c + 1)}
                    interactive
                    activeTool={designer.activeTool}
                    onMouseDown={designer.onCellMouseDown}
                    onMouseEnter={designer.onCellMouseEnter}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
