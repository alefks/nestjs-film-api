import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresService: Repository<Genre>,
  ) {}

  async genreNameValidation(genreName: string) {
    const genreNameValidation = this.genresService.findOne({
      where: { name: genreName },
    });

    if (!genreNameValidation)
      throw new BadRequestException('Genre name already exists.');
  }

  async create(createGenreDto: CreateGenreDto) {
    this.genreNameValidation(createGenreDto.name);

    createGenreDto.films = <any>(
      createGenreDto.films.map((id) => ({ ...new Film(), id: id }))
    );

    const genreEntity = this.genresService.create(createGenreDto);
    return await this.genresService.save(genreEntity);
  }

  async findAll() {
    return this.genresService.find({ relations: { films: true } });
  }

  async findOne(id: number) {
    let genre: Genre;
    try {
      genre = await this.genresService.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('Genre not found.');
    }

    return genre;
  }

  async update(id: number, updateGenresDto: UpdateGenreDto) {
    if (!updateGenresDto.name || !updateGenresDto.name)
      throw new BadRequestException(
        'Please verify your data input and try again.',
      );

    let genre: Genre;
    try {
      genre = await this.genresService.findOneOrFail({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException('Genre not found.');
    }

    await this.genresService.merge(genre, updateGenresDto);
    await this.genresService.save(genre);
  }

  async remove(id: number) {
    let genre: Genre;

    try {
      genre = await this.genresService.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
    return await this.genresService.softDelete({ id });
  }
}
