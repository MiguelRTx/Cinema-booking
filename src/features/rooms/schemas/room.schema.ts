import { z } from 'zod';

export const roomSchema = z.object({
  name: z.string().min(1, 'El nombre de la sala es requerido'),
  totalRows: z
    .number()
    .min(1, 'Mínimo 1 fila')
    .max(30, 'Máximo 30 filas'),
  totalColumns: z
    .number()
    .min(1, 'Mínimo 1 columna')
    .max(30, 'Máximo 30 columnas'),
});

export type RoomFormData = z.infer<typeof roomSchema>;
