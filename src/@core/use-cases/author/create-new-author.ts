import { Author, Email } from '@core/entities/author/';
import { AuthorRepository } from '@core/repositories/';
import { Injectable } from '@nestjs/common';
import { ConflictError } from '../errors';

interface CreateNewAuthorRequest {
  firstName: string;
  lastName: string;
  email: string;
}

interface CreateNewAuthorResponse {
  author: Author;
}

@Injectable()
export class CreateNewAuthor {
  constructor(private authorRepo: AuthorRepository) {}

  async execute(
    request: CreateNewAuthorRequest,
  ): Promise<CreateNewAuthorResponse> {
    const { firstName, lastName, email } = request;
    const author = new Author({
      firstName,
      lastName,
      email: new Email(email),
    });

    const authorEmail = await this.authorRepo.findByEmail(email);
    if (authorEmail) throw new ConflictError();

    await this.authorRepo.create(author);

    return {
      author,
    };
  }
}
