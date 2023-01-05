import { AuthorRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface DeleteAuthorRequest {
  id: string;
}

@Injectable()
export class DeleteAuthor {
  constructor(private authorRepo: AuthorRepository) {}

  async execute(request: DeleteAuthorRequest): Promise<void> {
    const { id } = request;
    const author = await this.authorRepo.findById(id);
    if (!author) throw new NotFoundError();

    await this.authorRepo.delete(id);
  }
}
