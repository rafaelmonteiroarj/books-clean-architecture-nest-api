import {
  AuthorRepository,
  BooksRepository,
  GenreRepository,
} from '@core/repositories';
import { Module } from '@nestjs/common';
import {
  PrismaAuthorRepository,
  PrismaBookRepository,
  PrismaGenreRepository,
} from './prisma/repositories/';
import { PrismaService } from './prisma/service/';

@Module({
  providers: [
    PrismaService,
    {
      provide: AuthorRepository,
      useClass: PrismaAuthorRepository,
    },
    {
      provide: GenreRepository,
      useClass: PrismaGenreRepository,
    },
    {
      provide: BooksRepository,
      useClass: PrismaBookRepository,
    },
  ],
  exports: [AuthorRepository, GenreRepository, BooksRepository],
})
export class DatabaseModule {}
