import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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
    const where: any = {};
    if (genre) where.genre = genre;
    if (search) {
      where.title = { [Op.iLike]: `%${search}%` }; // Op.iLike para Postgres
    }
    return this.movieModel.findAll({ where });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) throw new NotFoundException('Película no encontrada');
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
