import { Book } from '@core/entities/book';
import { BooksRepository } from '@core/repositories/';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/';

interface GetSingleBookRequest {
  id: string;
}

interface GetSingleBookResponse {
  book: Book | null;
}

@Injectable()
export class GetSingleBook {
  constructor(private booksRepo: BooksRepository) {}

  async execute(request: GetSingleBookRequest): Promise<GetSingleBookResponse> {
    const { id } = request;
    const book = await this.booksRepo.findById(id);
    if (!book) throw new NotFoundError();

    return {
      book,
    };
  }
}
