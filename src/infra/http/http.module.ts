import {
  CreateNewAuthor,
  DeleteAuthor,
  GetSingleAuthor,
  UpdateAuthor,
} from '@core/use-cases/author';
import {
  CreateNewBook,
  DeleteBook,
  GetManyBooks,
  GetSingleBook,
  UpdateBook,
} from '@core/use-cases/book';
import {
  CreateNewGenre,
  DeleteGenre,
  GetSingleGenre,
  UpdateGenre,
} from '@core/use-cases/genre';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import {
  AuthorController,
  BookController,
  GenreController,
} from './controllers/';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController, BookController, GenreController],
  providers: [
    CreateNewAuthor,
    CreateNewGenre,
    CreateNewBook,
    GetSingleBook,
    GetManyBooks,
    UpdateBook,
    DeleteBook,
    GetSingleAuthor,
    UpdateAuthor,
    DeleteAuthor,
    GetSingleGenre,
    UpdateGenre,
    DeleteGenre,
  ],
})
export class HttpModule {}
