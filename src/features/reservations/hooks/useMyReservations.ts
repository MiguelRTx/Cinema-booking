import { useQuery } from '@tanstack/react-query';
import { reservationsService } from '../services/reservations.service';

export function useMyReservations() {
  return useQuery({
    queryKey: ['my-reservations'],
    queryFn: () => reservationsService.getMyReservations(),
  });
}
