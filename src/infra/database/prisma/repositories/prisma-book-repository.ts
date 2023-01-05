import { Book } from '@core/entities/book';
import { BooksRepository } from '@core/repositories/';
import { NotFoundError } from '@infra/http/errors';
import { Injectable } from '@nestjs/common';
import { PrismaBookMapper } from '../mappers/';
import { PrismaService } from '../service/';

@Injectable()
export class PrismaBookRepository implements BooksRepository {
  constructor(private prisma: PrismaService) {}

  async create(book: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(book);
    const data = {
      ...raw,
      authorId: '74ab057a-6597-49d0-a940-f75874358156',
      genreId: '9a855ac6-fb54-455f-adc6-b945feae986a',
    };

    await this.prisma.book.create({ data });
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundError();

    return PrismaBookMapper.toDomain(book);
  }

  async findMany(): Promise<Book[]> {
    const books = await this.prisma.book.findMany();

    return books.map(PrismaBookMapper.toDomain);
  }

  async update(id: string, book: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(book);

    await this.prisma.book.update({
      where: { id },
      data: {
        title: raw.title,
        description: raw.description,
        updatedAt: raw.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}
