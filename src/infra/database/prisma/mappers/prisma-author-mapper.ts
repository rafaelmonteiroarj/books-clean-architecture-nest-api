import { Author, Email } from '@core/entities/author';
import { Author as RawAuthor } from '@prisma/client';

export class PrismaAuthorMapper {
  static toPrisma(author: Author) {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email.value,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  }

  static toDomain(raw: RawAuthor) {
    return new Author(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: new Email(raw.email),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
