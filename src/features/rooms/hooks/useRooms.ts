import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomsService } from '../services/rooms.service';
import type { CreateRoomPayload, UpdateRoomPayload, CellType } from '../../../types/room.types';

export const roomKeys = {
  all: ['rooms'] as const,
  detail: (id: string) => [...roomKeys.all, id] as const,
};

export function useRooms() {
  return useQuery({
    queryKey: roomKeys.all,
    queryFn: () => roomsService.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => roomsService.getById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useCreateRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoomPayload) => roomsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

export function useUpdateRoom(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRoomPayload) => roomsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
    },
  });
}

export function useUpdateRoomLayout(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (layout: Record<string, CellType>) =>
      roomsService.updateLayout(id, layout),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(id) });
    },
  });
}
