import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Genre } from '../../genres/entities/genre.entity';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @IsNotEmpty()
  @IsNumber()
  imdb: number;

  @IsNotEmpty()
  @IsNumber(
    {},
    { each: true, message: 'Genres field needs to be an array of numbers.' },
  )
  genres: Genre[];
}
