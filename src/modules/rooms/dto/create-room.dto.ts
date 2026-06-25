import { IsString, IsInt, IsNotEmpty, Min, IsOptional, IsObject } from 'class-validator';

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

  @IsOptional()
  @IsObject()
  layout?: Record<string, string>;
}
