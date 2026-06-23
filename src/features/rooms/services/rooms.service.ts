import { api } from '../../../services/axios';
import type { Room, CreateRoomPayload, UpdateRoomPayload } from '../../../types/room.types';

export const roomsService = {
  async getAll(): Promise<Room[]> {
    const response = await api.get<Room[]>('/rooms');
    return response.data;
  },

  async getById(id: string): Promise<Room> {
    const response = await api.get<Room>(`/rooms/${id}`);
    return response.data;
  },

  async create(data: CreateRoomPayload): Promise<Room> {
    const response = await api.post<Room>('/rooms', data);
    return response.data;
  },

  async update(id: string, data: UpdateRoomPayload): Promise<Room> {
    const response = await api.patch<Room>(`/rooms/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/rooms/${id}`);
  },
};
