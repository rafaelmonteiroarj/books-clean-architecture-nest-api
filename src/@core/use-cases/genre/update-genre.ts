import { Genre } from '@core/entities/genre';
import { GenreRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors';

interface UpdateGenreRequest {
  name: string;
}

interface UpdateGenreResponse {
  genre: Genre;
}

@Injectable()
export class UpdateGenre {
  constructor(private genreRepo: GenreRepository) {}

  async execute(
    id: string,
    request: UpdateGenreRequest,
  ): Promise<UpdateGenreResponse> {
    const { name } = request;
    const genre = new Genre({ name });

    const identifier = await this.genreRepo.findById(id);
    if (!identifier) throw new NotFoundError();

    await this.genreRepo.update(id, genre);

    return {
      genre,
    };
  }
}
