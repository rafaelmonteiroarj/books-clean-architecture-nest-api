import { Author } from '@core/entities/author';

export class HttpAuthorMapper {
  static toHTTP(author: Author) {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email.value,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  }
}
