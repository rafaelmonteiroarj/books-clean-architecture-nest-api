import { Author } from '@core/entities/author/';

export abstract class AuthorRepository {
  abstract create(author: Author): Promise<void>;
  abstract findById(id: string): Promise<Author | null>;
  abstract findByEmail(email: string): Promise<Author | null>;
  abstract update(id: string, author: Author): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
