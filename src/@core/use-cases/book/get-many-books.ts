import { Book } from '@core/entities/book';
import { BooksRepository } from '@core/repositories';
import { Injectable } from '@nestjs/common';

interface GetManyBooksResponse {
  books: Book[];
}

@Injectable()
export class GetManyBooks {
  constructor(private booksRepo: BooksRepository) {}

  async execute(): Promise<GetManyBooksResponse> {
    const books = await this.booksRepo.findMany();

    return {
      books,
    };
  }
}
