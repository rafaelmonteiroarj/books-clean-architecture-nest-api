import {
  CreateNewGenre,
  DeleteGenre,
  GetSingleGenre,
  UpdateGenre,
} from '@core/use-cases/genre';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from '../dtos';
import { HttpGenreMapper } from '../mappers/';

@Controller('api/v1/genres')
export class GenreController {
  constructor(
    private createGenre: CreateNewGenre,
    private getSingleGenre: GetSingleGenre,
    private updateGenre: UpdateGenre,
    private deleteGenre: DeleteGenre,
  ) {}

  @Post()
  async create(@Body() data: CreateGenreDto) {
    const { name } = data;
    const { genre } = await this.createGenre.execute({ name });

    return {
      genre: HttpGenreMapper.toHTTP(genre),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const { genre } = await this.getSingleGenre.execute({ id });
    if (!genre) return null;

    return {
      genre: HttpGenreMapper.toHTTP(genre),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateGenreDto) {
    const { name } = data;
    const { genre } = await this.updateGenre.execute(id, { name });

    return {
      genre: {
        name: genre.name,
      },
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteGenre.execute({ id });

    return {};
  }
}
