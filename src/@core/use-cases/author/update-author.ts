import { Author, Email } from '@core/entities/author';
import { AuthorRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface UpdateAuthorRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface UpdateAuthorResponse {
  author: Author;
}

@Injectable()
export class UpdateAuthor {
  constructor(private authorRepo: AuthorRepository) {}

  async execute(
    id: string,
    request: UpdateAuthorRequest,
  ): Promise<UpdateAuthorResponse> {
    const { firstName, lastName, email }: any = request;
    const author = new Author({ firstName, lastName, email: new Email(email) });

    const identifier = await this.authorRepo.findById(id);
    if (!identifier) throw new NotFoundError();

    await this.authorRepo.update(id, author);

    return {
      author,
    };
  }
}
