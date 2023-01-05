import { Genre } from '@core/entities/genre';

export abstract class GenreRepository {
  abstract create(genre: Genre): Promise<void>;
  abstract findById(id: string): Promise<Genre | null>;
  abstract update(id: string, genre: Genre): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
