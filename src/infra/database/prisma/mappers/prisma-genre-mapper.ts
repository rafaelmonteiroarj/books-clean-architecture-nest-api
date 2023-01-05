import { Genre } from '@core/entities/genre';
import { Genre as RawGenre } from '@prisma/client';

export class PrismaGenreMapper {
  static toPrisma(genre: Genre) {
    return {
      id: genre.id,
      name: genre.name,
      createdAt: genre.createdAt,
      updatedAt: genre.updatedAt,
    };
  }

  static toDomain(raw: RawGenre) {
    return new Genre(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
