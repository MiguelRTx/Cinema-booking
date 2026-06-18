import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Reservation } from './reservation.model';
import { Showtime } from '../../showtimes/models/showtime.model';

@Table({
  tableName: 'reserved_seats',
  indexes: [
    {
      unique: true,
      fields: ['showtimeId', 'rowNumber', 'columnNumber'],
    }
  ]
})
export class ReservedSeat extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  declare id: string;

  @ForeignKey(() => Reservation)
  @Column({ type: DataType.UUID, allowNull: false })
  reservationId: string;

  @ForeignKey(() => Showtime)
  @Column({ type: DataType.UUID, allowNull: false })
  showtimeId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rowNumber: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  columnNumber: number;

  @BelongsTo(() => Reservation)
  reservation: Reservation;

  @BelongsTo(() => Showtime)
  showtime: Showtime;
}
