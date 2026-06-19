import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Showtime } from './models/showtime.model';
import { Movie } from '../movies/models/movie.model';
import { Room } from '../rooms/models/room.model';
import { ReservedSeat } from '../reservations/models/reserved-seat.model';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectModel(Showtime) private showtimeModel: typeof Showtime,
    @InjectModel(Movie) private movieModel: typeof Movie,
    @InjectModel(Room) private roomModel: typeof Room,
    @InjectModel(ReservedSeat) private seatModel: typeof ReservedSeat,
  ) {}

  async create(dto: CreateShowtimeDto) {
    const movie = await this.movieModel.findByPk(dto.movieId);
    if (!movie) throw new BadRequestException('Pelicula no encontrada');

    const room = await this.roomModel.findByPk(dto.roomId);
    if (!room) throw new BadRequestException('Sala no encontrada');

    const start = new Date(dto.startTime);
    const end = new Date(start.getTime() + (movie.duration + 30) * 60000);

    const overlappingShowtime = await this.showtimeModel.findOne({
      where: {
        roomId: dto.roomId,
        [Op.or]: [
          {
            startTime: { [Op.lt]: end },
            endTime: { [Op.gt]: start },
          },
        ],
      },
    });

    if (overlappingShowtime) {
      throw new BadRequestException(
        'El horario se superpone con otra funcion en esta sala',
      );
    }

    return this.showtimeModel.create({
      ...dto,
      endTime: end,
      price: dto.price,
    } as any);
  }

  async getSeats(showtimeId: string) {
    const showtime = await this.showtimeModel.findByPk(showtimeId, {
      include: [Room],
    });
    if (!showtime) throw new NotFoundException('Funcion no encontrada');

    const reservedSeats = await this.seatModel.findAll({
      where: { showtimeId },
    });

    return {
      room: {
        rows: showtime.room.totalRows,
        columns: showtime.room.totalColumns,
      },
      reservedSeats: reservedSeats.map((s) => ({
        row: s.rowNumber,
        column: s.columnNumber,
      })),
    };
  }
}
