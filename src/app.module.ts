import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

import { User } from './modules/users/models/user.model';
import { Movie } from './modules/movies/models/movie.model';
import { Room } from './modules/rooms/models/room.model';
import { Showtime } from './modules/showtimes/models/showtime.model';
import { Reservation } from './modules/reservations/models/reservation.model';
import { ReservedSeat } from './modules/reservations/models/reserved-seat.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'cinema_db',
      models: [User, Movie, Room, Showtime, Reservation, ReservedSeat],
      autoLoadModels: true,
      synchronize: true, // Para desarrollo
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    RoomsModule,
    ShowtimesModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
