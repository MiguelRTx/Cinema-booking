import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Movie } from '../../movies/models/movie.model';
import { Room } from '../../rooms/models/room.model';
import { Reservation } from '../../reservations/models/reservation.model';
import { ReservedSeat } from '../../reservations/models/reserved-seat.model';

@Table({ tableName: 'showtimes' })
export class Showtime extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  declare id: string;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.UUID, allowNull: false })
  movieId: string;

  @ForeignKey(() => Room)
  @Column({ type: DataType.UUID, allowNull: false })
  roomId: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startTime: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  endTime: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0 })
  price: number;

  @BelongsTo(() => Movie)
  movie: Movie;

  @BelongsTo(() => Room)
  room: Room;

  @HasMany(() => Reservation)
  reservations: Reservation[];

  @HasMany(() => ReservedSeat)
  reservedSeats: ReservedSeat[];
}
