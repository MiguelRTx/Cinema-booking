import { api } from '../../../services/axios';
import type { Showtime, CreateShowtimePayload, ShowtimeSeatsResponse } from '../../../types/showtime.types';

export const showtimesService = {
  async create(data: CreateShowtimePayload): Promise<Showtime> {
    const response = await api.post<Showtime>('/showtimes', data);
    return response.data;
  },

  async getSeats(showtimeId: string): Promise<ShowtimeSeatsResponse> {
    const response = await api.get<ShowtimeSeatsResponse>(`/showtimes/${showtimeId}/seats`);
    return response.data;
  },
  async getByMovie(movieId: string): Promise<Showtime[]> {
    const response = await api.get<Showtime[]>(`/showtimes/movie/${movieId}`);
    return response.data;
  },
  async getAll(): Promise<Showtime[]> {
    const response = await api.get<Showtime[]>('/showtimes');
    return response.data;
  },
};
