import { Book } from '@core/entities/book';
import { Book as RawBook } from '@prisma/client';

export class PrismaBookMapper {
  static toPrisma(book: Book) {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      authorId: book.authorId,
      genreId: book.genreId,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  static toDomain(raw: RawBook) {
    return new Book(
      {
        title: raw.title,
        description: raw.description,
        authorId: raw.authorId,
        genreId: raw.genreId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
