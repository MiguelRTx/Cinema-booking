import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Showtime } from '../../showtimes/models/showtime.model';
import { ReservedSeat } from './reserved-seat.model';

@Table({ tableName: 'reservations' })
export class Reservation extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Showtime)
  @Column({ type: DataType.UUID, allowNull: false })
  showtimeId: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  reservationDate: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Showtime)
  showtime: Showtime;

  @HasMany(() => ReservedSeat)
  reservedSeats: ReservedSeat[];
}
