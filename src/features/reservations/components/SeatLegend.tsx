export function SeatLegend() {
  return (
    <div className="flex flex-wrap gap-4 justify-center text-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-t-lg bg-green-900/50 border border-green-700/50" />
        <span className="text-gray-400">Disponible</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-t-lg bg-red-600 border border-red-500" />
        <span className="text-gray-400">Seleccionado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-t-lg bg-gray-800 border border-gray-700 opacity-50" />
        <span className="text-gray-400">Ocupado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-sm bg-gray-800/40 border border-gray-700/30" />
        <span className="text-gray-400">Pasillo</span>
      </div>
    </div>
  );
}
