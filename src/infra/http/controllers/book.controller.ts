import {
  CreateNewBook,
  DeleteBook,
  GetManyBooks,
  GetSingleBook,
  UpdateBook,
} from '@core/use-cases/book';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../dtos/';
import { HttpBookMapper } from '../mappers/';

@Controller('api/v1/books')
export class BookController {
  constructor(
    private createBook: CreateNewBook,
    private getSingleBook: GetSingleBook,
    private getManyBooks: GetManyBooks,
    private updateBook: UpdateBook,
    private deleteBook: DeleteBook,
  ) {}

  @Post()
  async create(@Body() data: CreateBookDto) {
    const { title, description } = data;
    const { book } = await this.createBook.execute({ title, description });

    return {
      book: HttpBookMapper.toHTTP(book),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const { book } = await this.getSingleBook.execute({ id });
    if (!book) return null;

    return {
      book: HttpBookMapper.toHTTP(book),
    };
  }

  @Get()
  async getMany() {
    const { books } = await this.getManyBooks.execute();

    return {
      books: books.map(HttpBookMapper.toHTTP),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    const { title, description } = data;
    const { book } = await this.updateBook.execute(id, { title, description });

    return {
      book: {
        title: book.title,
        description: book.description,
      },
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteBook.execute({ id });

    return {};
  }
}
