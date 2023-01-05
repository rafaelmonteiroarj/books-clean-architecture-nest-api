import { Book } from '@core/entities/book';

export abstract class BooksRepository {
  abstract create(book: Book): Promise<void>;
  abstract findById(id: string): Promise<Book | null>;
  abstract findMany(): Promise<Book[]>;
  abstract update(id: string, book: Book): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
