import { Book } from '@core/entities/book';
import { BooksRepository } from '@core/repositories/';

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = [];

  async create(book: Book) {
    this.books.push(book);
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id);
    if (!book) return null;

    return book;
  }

  async findMany(): Promise<Book[]> {
    return this.books;
  }

  async update(id: string, newBook: Book): Promise<void> {
    const book = this.books.find((props) => props.id === id);
    if (!book) throw new Error();

    book.title = newBook.title;
    book.description = newBook.description;
  }

  async delete(id: string): Promise<any> {
    const books = this.books.filter((props) => props.id !== id);
    this.books = books;
  }
}
