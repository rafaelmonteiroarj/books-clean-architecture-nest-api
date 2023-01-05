import { BooksRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface DeleteBookRequest {
  id: string;
}

@Injectable()
export class DeleteBook {
  constructor(private booksRepo: BooksRepository) {}

  async execute(request: DeleteBookRequest): Promise<void> {
    const { id } = request;
    const book = await this.booksRepo.findById(id);
    if (!book) throw new NotFoundError();

    await this.booksRepo.delete(id);
  }
}
