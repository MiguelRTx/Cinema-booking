export interface Room {
  id: string;
  name: string;
  totalRows: number;
  totalColumns: number;
}

export type CreateRoomPayload = Omit<Room, 'id'>;
export type UpdateRoomPayload = Partial<CreateRoomPayload>;

// ──────────────────────────────────────────────
// Room Designer types (frontend-only persistence)
// ──────────────────────────────────────────────
export type CellType = 'seat' | 'aisle' | 'empty';

export interface RoomCell {
  row: number;
  col: number;
  type: CellType;
}

export type DesignerTool = 'seat' | 'aisle' | 'empty';

export interface RoomLayout {
  roomId: string;
  rows: number;
  cols: number;
  /** key format: "row-col" */
  cells: Record<string, CellType>;
}
