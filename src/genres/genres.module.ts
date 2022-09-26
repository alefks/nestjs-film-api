import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Film } from '../films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Film])],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
