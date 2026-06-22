import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './models/reservation.model';
import { ReservedSeat } from './models/reserved-seat.model';

@Module({
  imports: [SequelizeModule.forFeature([Reservation, ReservedSeat])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
