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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.create(createGenreDto);
  }

  @Get()
  async findAll() {
    return await this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.genresService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return await this.genresService.update(id, updateGenreDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return await this.genresService.remove(id);
  }
}
