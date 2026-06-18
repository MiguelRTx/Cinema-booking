import { IsString, IsInt, IsNotEmpty, IsUrl, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
