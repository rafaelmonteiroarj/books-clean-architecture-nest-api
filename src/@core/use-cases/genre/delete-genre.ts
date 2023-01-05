import { GenreRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface DeleteGenreRequest {
  id: string;
}

@Injectable()
export class DeleteGenre {
  constructor(private genreRepo: GenreRepository) {}

  async execute(request: DeleteGenreRequest): Promise<void> {
    const { id } = request;

    const genre = await this.genreRepo.findById(id);
    if (!genre) throw new NotFoundError();

    await this.genreRepo.delete(id);
  }
}
