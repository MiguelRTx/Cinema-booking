import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Movie } from './models/movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieModel: typeof Movie) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create({ ...createMovieDto } as any);
  }

  async findAll(genre?: string, search?: string): Promise<Movie[]> {
    const where: WhereOptions<Movie> = {};
    if (genre) (where as Record<string, unknown>).genre = genre;
    if (search) {
      (where as Record<string, unknown>).title = {
        [Op.iLike]: `%${search}%`,
      };
    }
    return this.movieModel.findAll({ where });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) throw new NotFoundException('Pelicula no encontrada');
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    return movie.update(updateMovieDto);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.findOne(id);
    await movie.destroy();
  }
}
