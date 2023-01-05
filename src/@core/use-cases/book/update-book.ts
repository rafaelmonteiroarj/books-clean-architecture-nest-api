import { Book } from '@core/entities/book';
import { BooksRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface UpdateBookRequest {
  title?: string;
  description?: string;
}

interface UpdateBookResponse {
  book: Book;
}

@Injectable()
export class UpdateBook {
  constructor(private booksRepo: BooksRepository) {}

  async execute(
    id: string,
    request: UpdateBookRequest,
  ): Promise<UpdateBookResponse> {
    const { title, description }: any = request;
    const book = new Book({ title, description });

    const identifier = await this.booksRepo.findById(id);
    if (!identifier) throw new NotFoundError();

    await this.booksRepo.update(id, book);

    return {
      book,
    };
  }
}
