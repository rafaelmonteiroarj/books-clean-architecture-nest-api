import makeBook from '@test/factories/book-factory';
import { InMemoryBooksRepository } from '@test/repositories/';
import { GetManyBooks } from './get-many-books';

describe('Get Many Books', () => {
  it('should be able to get all books', async () => {
    const booksRepo = new InMemoryBooksRepository();
    const getManyBooks = new GetManyBooks(booksRepo);

    await booksRepo.create(
      makeBook({ title: 'Title 1', description: 'Description 1' }),
    );
    await booksRepo.create(
      makeBook({ title: 'Title 2', description: 'Description 2' }),
    );
    await booksRepo.create(
      makeBook({ title: 'Title 3', description: 'Description 3' }),
    );

    const { books } = await getManyBooks.execute();

    expect(booksRepo.books).toEqual(books);
    expect(booksRepo.books).toHaveLength(3);
    expect(booksRepo.books).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Title 1',
          description: 'Description 1',
        }),
        expect.objectContaining({
          title: 'Title 2',
          description: 'Description 2',
        }),
        expect.objectContaining({
          title: 'Title 3',
          description: 'Description 3',
        }),
      ]),
    );
  });
});
