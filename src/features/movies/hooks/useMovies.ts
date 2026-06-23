import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moviesService } from '../services/movies.service';
import type { MovieFilters, CreateMoviePayload, UpdateMoviePayload } from '../../../types/movie.types';

export const movieKeys = {
  all: ['movies'] as const,
  list: (filters?: MovieFilters) => [...movieKeys.all, filters] as const,
  detail: (id: string) => [...movieKeys.all, id] as const,
};

export function useMovies(filters?: MovieFilters) {
  return useQuery({
    queryKey: movieKeys.list(filters),
    queryFn: () => moviesService.getAll(filters),
    staleTime: 1000 * 60 * 2,
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => moviesService.getById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMoviePayload) => moviesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
    },
  });
}

export function useUpdateMovie(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMoviePayload) => moviesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => moviesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
    },
  });
}
