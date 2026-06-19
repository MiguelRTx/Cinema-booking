import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Reservation } from './models/reservation.model';
import { ReservedSeat } from './models/reserved-seat.model';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation) private reservationModel: typeof Reservation,
    @InjectModel(ReservedSeat) private seatModel: typeof ReservedSeat,
    private sequelize: Sequelize,
  ) {}

  async createReservation(userId: string, dto: CreateReservationDto) {
    const t = await this.sequelize.transaction();

    try {
      const reservation = await this.reservationModel.create(
        {
          userId,
          showtimeId: dto.showtimeId,
        } as any,
        { transaction: t },
      );

      const seatsToInsert = dto.seats.map((seat) => ({
        reservationId: reservation.id,
        showtimeId: dto.showtimeId,
        rowNumber: seat.rowNumber,
        columnNumber: seat.columnNumber,
      }));

      await this.seatModel.bulkCreate(seatsToInsert as any, {
        transaction: t,
      });
      await t.commit();

      return await this.reservationModel.findByPk(reservation.id, {
        include: [ReservedSeat],
      });
    } catch (error: unknown) {
      await t.rollback();
      if (
        error instanceof Error &&
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        throw new BadRequestException(
          'Uno o mas asientos seleccionados ya estan reservados.',
        );
      }
      throw new InternalServerErrorException('Error procesando la reserva');
    }
  }
}
