import { useState, useCallback, useRef } from 'react';
import type { CellType, DesignerTool } from '../../../types/room.types';

function buildCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

function buildDefaultCells(rows: number, cols: number): Record<string, CellType> {
  const cells: Record<string, CellType> = {};
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      cells[buildCellKey(r, c)] = 'seat';
    }
  }
  return cells;
}

interface UseRoomDesignerOptions {
  roomId: string;
  rows: number;
  cols: number;
  initialLayout?: Record<string, CellType> | null;
  onSave?: (cells: Record<string, CellType>) => void;
}

export function useRoomDesigner({ rows, cols, initialLayout, onSave }: UseRoomDesignerOptions) {
  const [activeTool, setActiveTool] = useState<DesignerTool>('seat');
  const isPainting = useRef(false);

  const [cells, setCells] = useState<Record<string, CellType>>(() => {
    if (initialLayout && Object.keys(initialLayout).length > 0) return initialLayout;
    return buildDefaultCells(rows, cols);
  });

  const applyTool = useCallback((row: number, col: number) => {
    setCells((prev) => ({
      ...prev,
      [buildCellKey(row, col)]: activeTool,
    }));
  }, [activeTool]);

  const onCellMouseDown = useCallback((row: number, col: number) => {
    isPainting.current = true;
    applyTool(row, col);
  }, [applyTool]);

  const onCellMouseEnter = useCallback((row: number, col: number) => {
    if (isPainting.current) {
      applyTool(row, col);
    }
  }, [applyTool]);

  const onMouseUp = useCallback(() => {
    isPainting.current = false;
  }, []);

  const resetToDefault = useCallback(() => {
    setCells(buildDefaultCells(rows, cols));
  }, [rows, cols]);

  const save = useCallback(() => {
    onSave?.(cells);
  }, [cells, onSave]);

  const getCellType = useCallback((row: number, col: number): CellType => {
    return cells[buildCellKey(row, col)] ?? 'seat';
  }, [cells]);

  const stats = {
    seats: Object.values(cells).filter((t) => t === 'seat').length,
    aisles: Object.values(cells).filter((t) => t === 'aisle').length,
    empty: Object.values(cells).filter((t) => t === 'empty').length,
  };

  return {
    activeTool,
    setActiveTool,
    cells,
    getCellType,
    onCellMouseDown,
    onCellMouseEnter,
    onMouseUp,
    resetToDefault,
    save,
    stats,
  };
}
