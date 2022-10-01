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

  async filmTitleValidation(filmTitle: string) {
    const filmTitleValidation = await this.filmsService.findOne({
      where: { title: filmTitle },
    });

    if (filmTitleValidation)
      throw new BadRequestException('Film title already exists.');
  }

  async create(createFilmDto: CreateFilmDto) {
    await this.filmTitleValidation(createFilmDto.title);

    createFilmDto.genres = <any>(
      createFilmDto.genres.map((id) => ({ ...new Genre(), id: id }))
    );

    const filmEntity = this.filmsService.create(createFilmDto);
    return await this.filmsService.save(filmEntity);
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
