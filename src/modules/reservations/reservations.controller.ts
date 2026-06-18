import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(req.user.id, createReservationDto);
  }
}
