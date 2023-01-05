import makeBook from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/';
import { NotFoundError } from '../errors';
import { UpdateBook } from './update-book';

describe('Update Book', () => {
  it('should be able to update a book', async () => {
    const booksRepo = new InMemoryBooksRepository();
    const updateBook = new UpdateBook(booksRepo);

    const book1 = makeBook(
      {
        title: 'Book 1',
      },
      '240f85d8-892b-4fe2-aa40-deaff8631a65',
    );
    const book2 = makeBook(
      {
        title: 'Book 2',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await booksRepo.create(book1);
    await booksRepo.create(book2);

    const updatedBook2 = makeBook({
      title: 'Book 2 updated',
    });

    await updateBook.execute(
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
      updatedBook2,
    );

    expect(booksRepo.books[1]).toBeTruthy();
    expect(booksRepo.books[1]).toEqual(
      expect.objectContaining({
        title: 'Book 2 updated',
      }),
    );
  });

  it('should not be able to update an unexisting book', async () => {
    const booksRepo = new InMemoryBooksRepository();
    const updateBook = new UpdateBook(booksRepo);

    const book1 = makeBook(
      {
        title: 'Book 1',
      },
      '240f85d8-892b-4fe2-aa40-deaff8631a65',
    );
    const book2 = makeBook(
      {
        title: 'Book 2',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await booksRepo.create(book1);
    await booksRepo.create(book2);

    const updatedBook2 = makeBook({
      title: 'Book 2 updated',
    });

    expect(() => {
      return updateBook.execute(
        'c89496c6-3150-4b9a-b3f8-c72edb8a3777',
        updatedBook2,
      );
    }).rejects.toThrow(NotFoundError);
  });
});
