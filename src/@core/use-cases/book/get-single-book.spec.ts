import makeBook from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/';
import { NotFoundError } from '../errors/';
import { GetSingleBook } from './get-single-book';

describe('Get Single Book', () => {
  it('should be able get a book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getSingleBook = new GetSingleBook(booksRepository);
    const bookFactory = makeBook({}, 'a475d0ac-4f21-472f-89d8-a515a8c86f50');

    await booksRepository.create(bookFactory);

    const { book } = await getSingleBook.execute({
      id: 'a475d0ac-4f21-472f-89d8-a515a8c86f50',
    });

    expect(booksRepository.books[0]).toEqual(book);
  });

  it('should not be able get an unexisting book', async () => {
    const booksRepository = new InMemoryBooksRepository();
    const getSingleBook = new GetSingleBook(booksRepository);
    const bookFactory = makeBook({}, 'a475d0ac-4f21-472f-89d8-a515a8c86f50');
    await booksRepository.create(bookFactory);

    expect(() => {
      return getSingleBook.execute({
        id: 'a475d0ac-4f21-472f-89d8-a515a8c86f20',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
