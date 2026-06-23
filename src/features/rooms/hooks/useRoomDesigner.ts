import { useState, useCallback, useRef } from 'react';
import type { CellType, DesignerTool, RoomLayout } from '../../../types/room.types';

const STORAGE_KEY_PREFIX = 'room-layout-';

function getStorageKey(roomId: string) {
  return `${STORAGE_KEY_PREFIX}${roomId}`;
}

export function loadRoomLayout(roomId: string): Record<string, CellType> | null {
  try {
    const raw = localStorage.getItem(getStorageKey(roomId));
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, CellType>;
  } catch {
    return null;
  }
}

export function saveRoomLayout(layout: RoomLayout): void {
  const { roomId, cells } = layout;
  localStorage.setItem(getStorageKey(roomId), JSON.stringify(cells));
}

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
}

export function useRoomDesigner({ roomId, rows, cols }: UseRoomDesignerOptions) {
  const [activeTool, setActiveTool] = useState<DesignerTool>('seat');
  const isPainting = useRef(false);

  const [cells, setCells] = useState<Record<string, CellType>>(() => {
    // Try to load saved layout first
    const saved = loadRoomLayout(roomId);
    if (saved) return saved;
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
    saveRoomLayout({ roomId, rows, cols, cells });
  }, [roomId, rows, cols, cells]);

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
