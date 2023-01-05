import { Author } from '@core/entities/author';
import { AuthorRepository } from '@core/repositories/';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface GetSingleAuthorRequest {
  id: string;
}

interface GetSingleAuthorResponse {
  author: Author | null;
}

@Injectable()
export class GetSingleAuthor {
  constructor(private authorRepo: AuthorRepository) {}

  async execute(
    request: GetSingleAuthorRequest,
  ): Promise<GetSingleAuthorResponse> {
    const { id } = request;
    const author = await this.authorRepo.findById(id);
    if (!author) throw new NotFoundError();

    return {
      author,
    };
  }
}
