import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Showtime } from '../../showtimes/models/showtime.model';

@Table({ tableName: 'rooms' })
export class Room extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalRows: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalColumns: number;

  @Column({ type: DataType.JSONB, allowNull: true, defaultValue: null })
  layout: Record<string, string> | null;

  @HasMany(() => Showtime)
  showtimes: Showtime[];
}
