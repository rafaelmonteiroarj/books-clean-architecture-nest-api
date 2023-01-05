import makeBook from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories';
import { NotFoundError } from '../errors/';
import { DeleteBook } from './delete-book';

describe('Delete Book', () => {
  it('should be able to delete a book', async () => {
    const booksRepo = new InMemoryBooksRepository();
    const deleteBook = new DeleteBook(booksRepo);

    const book1 = makeBook({}, 'abf800ed-f391-4733-b597-2a2cbc2d6381');
    const book2 = makeBook({}, 'fd7f7559-0616-4454-af21-e1a93d26c07e');

    await booksRepo.create(book1);
    await booksRepo.create(book2);

    const deletedBook = await deleteBook.execute({
      id: 'abf800ed-f391-4733-b597-2a2cbc2d6381',
    });

    expect(booksRepo.books).toHaveLength(1);
    expect(deletedBook).toBeFalsy();
  });

  it('should not be able to delete an unexisting book', async () => {
    const booksRepo = new InMemoryBooksRepository();
    const deleteBook = new DeleteBook(booksRepo);

    const book1 = makeBook({}, 'abf800ed-f391-4733-b597-2a2cbc2d6381');
    const book2 = makeBook({}, 'fd7f7559-0616-4454-af21-e1a93d26c07e');

    await booksRepo.create(book1);
    await booksRepo.create(book2);

    expect(booksRepo.books).toHaveLength(2);
    expect(() => {
      return deleteBook.execute({
        id: 'uhf800ed-f391-4733-b597-2a2cbc2d6360',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
