import { api } from '../../../services/axios';
import type { CreateReservationPayload, Reservation } from '../../../types/reservation.types';

export const reservationsService = {
  async create(data: CreateReservationPayload): Promise<Reservation> {
    const response = await api.post<Reservation>('/reservations', data);
    return response.data;
  },
  async getMyReservations(): Promise<Reservation[]> {
    const response = await api.get<Reservation[]>('/reservations/me');
    return response.data;
  },
};
