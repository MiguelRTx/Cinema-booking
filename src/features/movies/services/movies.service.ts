import { api } from '../../../services/axios';
import type { Movie, CreateMoviePayload, UpdateMoviePayload, MovieFilters } from '../../../types/movie.types';

export const moviesService = {
  async getAll(filters?: MovieFilters): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/movies', { params: filters });
    return response.data;
  },

  async getById(id: string): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  async create(data: CreateMoviePayload): Promise<Movie> {
    const response = await api.post<Movie>('/movies', data);
    return response.data;
  },

  async update(id: string, data: UpdateMoviePayload): Promise<Movie> {
    const response = await api.patch<Movie>(`/movies/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/movies/${id}`);
  },
};
