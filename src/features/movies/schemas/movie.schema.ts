import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  duration: z
    .number()
    .min(1, 'La duración debe ser mayor a 0'),
  genre: z.string().min(1, 'El género es requerido'),
  rating: z.string().min(1, 'La clasificación es requerida'),
  synopsis: z.string().min(10, 'La sinopsis debe tener al menos 10 caracteres'),
  imageUrl: z.string().url('La URL de imagen no es válida').min(1, 'La URL de imagen es requerida'),
});

export type MovieFormData = z.infer<typeof movieSchema>;

export const GENRES = [
  'Acción',
  'Aventura',
  'Animación',
  'Comedia',
  'Crimen',
  'Documental',
  'Drama',
  'Fantasía',
  'Terror',
  'Romance',
  'Ciencia Ficción',
  'Thriller',
] as const;

export const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'ATP', '+13', '+16', '+18'] as const;
