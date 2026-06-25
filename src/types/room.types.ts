export interface Room {
  id: string;
  name: string;
  totalRows: number;
  totalColumns: number;
  layout: Record<string, CellType> | null;
}

export type CreateRoomPayload = Omit<Room, 'id' | 'layout'>;
export type UpdateRoomPayload = Partial<CreateRoomPayload>;

// ──────────────────────────────────────────────
// Room Designer types
// ──────────────────────────────────────────────
export type CellType = 'seat' | 'aisle' | 'empty';

export interface RoomCell {
  row: number;
  col: number;
  type: CellType;
}

export type DesignerTool = 'seat' | 'aisle' | 'empty';
