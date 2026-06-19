import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Reservation } from '../../reservations/models/reservation.model';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CLIENT,
  })
  role: UserRole;

  @HasMany(() => Reservation)
  reservations: Reservation[];
}
