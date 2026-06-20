import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimesService.create(createShowtimeDto);
  }

  @Get(':id/seats')
  @UseGuards(JwtAuthGuard)
  getSeats(@Param('id') id: string) {
    return this.showtimesService.getSeats(id);
  }
  @Get('movie/:movieId')
  @UseGuards(JwtAuthGuard)
  getByMovie(@Param('movieId') movieId: string) {
    return this.showtimesService.getByMovie(movieId);
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.showtimesService.findAll();
  }
}
