export interface Movie {
  id: string;
  title: string;
  duration: number;
  genre: string;
  rating: string;
  synopsis: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateMoviePayload = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMoviePayload = Partial<CreateMoviePayload>;

export interface MovieFilters {
  genre?: string;
  search?: string;
}
