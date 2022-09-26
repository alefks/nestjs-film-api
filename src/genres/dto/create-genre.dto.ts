import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Film } from '../../films/entities/film.entity';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber({}, { each: true, message: 'Films must be an array of numbers.' })
  films: Film[];
}
