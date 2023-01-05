import makeAuthor from '@test/factories/author-factory';

describe('Author', () => {
  it('should be able to create an author', () => {
    const author = makeAuthor();
    expect(author).toBeTruthy();
  });
});
