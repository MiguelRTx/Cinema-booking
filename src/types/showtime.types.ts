import type { Movie } from './movie.types';
import type { Room } from './room.types';

export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  startTime: string;
  endTime: string;
  price: number;
  movie?: Movie;
  room?: Room;
}

export interface CreateShowtimePayload {
  movieId: string;
  roomId: string;
  startTime: string;
  price: number;
}

export interface ShowtimeSeatsResponse {
  room: {
    rows: number;
    columns: number;
  };
  reservedSeats: {
    row: number;
    column: number;
  }[];
}
