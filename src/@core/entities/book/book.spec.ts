import makeBook from '@test/factories/book-factory';

describe('Book', () => {
  it('should be able to create a book', () => {
    const book = makeBook();
    expect(book).toBeTruthy();
  });
});
