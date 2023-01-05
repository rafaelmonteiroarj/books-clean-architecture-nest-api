import { Genre } from '@core/entities/genre';

export class HttpGenreMapper {
  static toHTTP(genre: Genre) {
    return {
      id: genre.id,
      name: genre.name,
      createdAt: genre.createdAt,
      updatedAt: genre.updatedAt,
    };
  }
}
