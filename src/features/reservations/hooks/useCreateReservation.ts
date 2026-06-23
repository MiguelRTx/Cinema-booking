import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationsService } from '../services/reservations.service';
import type { CreateReservationPayload } from '../../../types/reservation.types';

export function useCreateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateReservationPayload) => reservationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });
}
