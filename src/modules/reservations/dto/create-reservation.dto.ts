import { IsUUID, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class SeatDto {
  @IsInt()
  @Min(1)
  rowNumber: number;

  @IsInt()
  @Min(1)
  columnNumber: number;
}

export class CreateReservationDto {
  @IsUUID()
  showtimeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
