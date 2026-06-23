import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showtimesService } from '../services/showtimes.service';
import type { CreateShowtimePayload } from '../../../types/showtime.types';

export const showtimeKeys = {
  seats: (id: string) => ['showtime-seats', id] as const,
};

export function useShowtimeSeats(showtimeId: string) {
  return useQuery({
    queryKey: showtimeKeys.seats(showtimeId),
    queryFn: () => showtimesService.getSeats(showtimeId),
    staleTime: 1000 * 30,
    enabled: !!showtimeId,
  });
}

export function useShowtimes() {
  return useQuery({
    queryKey: ['showtimes'],
    queryFn: showtimesService.getAll,
  });
}
export function useCreateShowtime() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShowtimePayload) => showtimesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showtimes'] });
    },
  });
}
