import {
  IsUUID,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateShowtimeDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsNumber()
  @Min(0)
  price: number;
}
