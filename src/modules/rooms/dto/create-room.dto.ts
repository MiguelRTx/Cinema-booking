import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  totalRows: number;

  @IsInt()
  @Min(1)
  totalColumns: number;
}
