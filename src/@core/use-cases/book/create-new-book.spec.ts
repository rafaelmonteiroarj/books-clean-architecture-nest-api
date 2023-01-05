import makeBook from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/';
import { CreateNewBook } from './create-new-book';

describe('Create New Book', () => {
  it('should be able to create a new book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const createBook = new CreateNewBook(booksRepository);
    const bookFactory = makeBook();

    const { book } = await createBook.execute(bookFactory);

    expect(book).toBeTruthy();
    expect(booksRepository.books[0]).toEqual(book);
    expect(booksRepository.books).toHaveLength(1);
  });
});
