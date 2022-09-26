import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsNumber(
    {},
    { each: true, message: 'Genres needs to be an array of numbers.' },
  )
  genres: number[];
}
