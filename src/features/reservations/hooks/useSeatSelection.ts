import { useState, useCallback } from 'react';
import type { SeatPosition } from '../../../types/reservation.types';

const MAX_SEATS = 10;

export function useSeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<SeatPosition[]>([]);

  const isSelected = useCallback((row: number, col: number): boolean => {
    return selectedSeats.some((s) => s.rowNumber === row && s.columnNumber === col);
  }, [selectedSeats]);

  const toggleSeat = useCallback((row: number, col: number) => {
    setSelectedSeats((prev) => {
      if (prev.some((s) => s.rowNumber === row && s.columnNumber === col)) {
        return prev.filter((s) => !(s.rowNumber === row && s.columnNumber === col));
      }
      if (prev.length >= MAX_SEATS) return prev;
      return [...prev, { rowNumber: row, columnNumber: col }];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  return {
    selectedSeats,
    isSelected,
    toggleSeat,
    clearSelection,
    maxSeats: MAX_SEATS,
    canSelectMore: selectedSeats.length < MAX_SEATS,
  };
}
