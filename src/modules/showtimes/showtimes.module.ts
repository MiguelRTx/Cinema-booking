import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { Showtime } from './models/showtime.model';
import { Movie } from '../movies/models/movie.model';
import { Room } from '../rooms/models/room.model';
import { ReservedSeat } from '../reservations/models/reserved-seat.model';

@Module({
  imports: [SequelizeModule.forFeature([Showtime, Movie, Room, ReservedSeat])],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}
