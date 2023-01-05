import { Author } from '@core/entities/author';
import { AuthorRepository } from '@core/repositories/';

export class InMemoryAuthorRepository implements AuthorRepository {
  public authors: Author[] = [];

  async create(author: Author): Promise<void> {
    this.authors.push(author);
  }

  async findById(id: string): Promise<Author | null> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) return null;

    return author;
  }

  async findByEmail(email: string): Promise<Author | null> {
    const author = this.authors.find((props) => props.email.value === email);
    if (!author) return null;

    return author;
  }

  async update(id: string, newAuthor: Author): Promise<void> {
    const author = this.authors.find((props) => props.id === id);
    if (!author) throw new Error();

    author.firstName = newAuthor.firstName;
    author.lastName = newAuthor.lastName;
    author.email = newAuthor.email;
  }

  async delete(id: string): Promise<void> {
    const authors = this.authors.filter((props) => props.id !== id);
    this.authors = authors;
  }
}
