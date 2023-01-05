import { Author } from '@core/entities/author';
import { AuthorRepository } from '@core/repositories';
import { ConflictError, NotFoundError } from '@infra/http/errors';
import { Injectable } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/';
import { PrismaService } from '../service/';

@Injectable()
export class PrismaAuthorRepository implements AuthorRepository {
  constructor(private prisma: PrismaService) {}

  async create(author: Author): Promise<void> {
    const data = PrismaAuthorMapper.toPrisma(author);

    await this.prisma.author.create({ data });
  }

  async findById(id: string): Promise<Author | null> {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) throw new NotFoundError();

    return PrismaAuthorMapper.toDomain(author);
  }

  async findByEmail(email: string): Promise<Author | null> {
    const authorEmail = await this.prisma.author.findUnique({
      where: { email },
    });
    if (authorEmail) throw new ConflictError();

    return authorEmail;
  }

  async update(id: string, author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);

    await this.prisma.author.update({
      where: { id },
      data: {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: raw.email,
        updatedAt: raw.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.author.delete({ where: { id } });
  }
}
