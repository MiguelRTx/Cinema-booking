import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Showtime } from '../../showtimes/models/showtime.model';

@Table({ tableName: 'movies' })
export class Movie extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @Column({ type: DataType.STRING, allowNull: false })
  genre: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rating: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  synopsis: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imageUrl: string;

  @HasMany(() => Showtime)
  showtimes: Showtime[];
}
