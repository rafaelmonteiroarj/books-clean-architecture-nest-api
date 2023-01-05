import {
  CreateNewAuthor,
  DeleteAuthor,
  GetSingleAuthor,
  UpdateAuthor,
} from '@core/use-cases/author';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../dtos/';
import { HttpAuthorMapper } from '../mappers/';

@Controller('api/v1/authors')
export class AuthorController {
  constructor(
    private createAuthor: CreateNewAuthor,
    private getSingleAuthor: GetSingleAuthor,
    private updateAuthor: UpdateAuthor,
    private deleteAuthor: DeleteAuthor,
  ) {}

  @Post()
  async create(@Body() data: CreateAuthorDto) {
    const { firstName, lastName, email } = data;
    const { author } = await this.createAuthor.execute({
      firstName,
      lastName,
      email,
    });

    return {
      author: HttpAuthorMapper.toHTTP(author),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const { author } = await this.getSingleAuthor.execute({ id });
    if (!author) return null;

    return {
      author: HttpAuthorMapper.toHTTP(author),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateAuthorDto) {
    const { firstName, lastName, email } = data;
    const { author } = await this.updateAuthor.execute(id, {
      firstName,
      lastName,
      email,
    });

    return {
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email.value,
      },
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteAuthor.execute({ id });

    return {};
  }
}
