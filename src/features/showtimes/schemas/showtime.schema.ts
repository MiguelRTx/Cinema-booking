import { z } from 'zod';

export const showtimeSchema = z.object({
  movieId: z.string().uuid('Selecciona una película'),
  roomId: z.string().uuid('Selecciona una sala'),
  startTime: z.string().min(1, 'La fecha y hora es requerida'),
  price: z
    .number()
    .min(0, 'El precio no puede ser negativo'),
});

export type ShowtimeFormData = z.infer<typeof showtimeSchema>;
