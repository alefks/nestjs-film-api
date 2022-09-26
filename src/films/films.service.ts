import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../genres/entities/genre.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsService: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    return await this.filmsService
      .createQueryBuilder()
      .relation(Film, 'genres')
      .of(1)
      .add(1);
  }

  async findAll() {
    return this.filmsService.find({ relations: { genres: true } });
  }

  async findOne(id: number) {
    let film: Film;
    try {
      film = await this.filmsService.findOneOrFail({
        where: { id: id },
        relations: { genres: true },
      });
    } catch (error) {
      throw new NotFoundException('Film not found.');
    }

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {

    let film: Film;
    try {
      film = await this.filmsService.findOneOrFail({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException('Film not found.');
    }

    await this.filmsService.merge(film, updateFilmDto);
    await this.filmsService.save(film);
  }

  async remove(id: number) {
    let film: Film;

    try {
      film = await this.filmsService.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('Film not found.');
    }
    return await this.filmsService.softDelete({ id });
  }
}
