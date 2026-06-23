export interface SeatPosition {
  rowNumber: number;
  columnNumber: number;
}

export interface CreateReservationPayload {
  showtimeId: string;
  seats: SeatPosition[];
}

export interface ReservedSeat {
  id: string;
  reservationId: string;
  showtimeId: string;
  rowNumber: number;
  columnNumber: number;
}

import type { Showtime } from './showtime.types';

export interface Reservation {
  id: string;
  userId: string;
  showtimeId: string;
  reservationDate: string;
  reservedSeats: ReservedSeat[];
  showtime?: Showtime;
}
