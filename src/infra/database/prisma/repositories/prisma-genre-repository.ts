import { Genre } from '@core/entities/genre';
import { GenreRepository } from '@core/repositories/';
import { NotFoundError } from '@infra/http/errors';
import { Injectable } from '@nestjs/common';
import { PrismaGenreMapper } from '../mappers/';
import { PrismaService } from '../service/';

@Injectable()
export class PrismaGenreRepository implements GenreRepository {
  constructor(private prisma: PrismaService) {}

  async create(genre: Genre): Promise<void> {
    const data = PrismaGenreMapper.toPrisma(genre);

    await this.prisma.genre.create({ data });
  }

  async findById(id: string): Promise<Genre | null> {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundError();

    return PrismaGenreMapper.toDomain(genre);
  }

  async update(id: string, genre: Genre): Promise<void> {
    const raw = PrismaGenreMapper.toPrisma(genre);

    await this.prisma.genre.update({
      where: { id },
      data: {
        name: raw.name,
        updatedAt: raw.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.genre.delete({ where: { id } });
  }
}
