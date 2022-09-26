import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.filmsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.filmsService.remove(id);
  }
}
