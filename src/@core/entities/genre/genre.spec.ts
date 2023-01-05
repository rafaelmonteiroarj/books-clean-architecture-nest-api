import makeGenre from '@test/factories/genre-factory';

describe('Genre', () => {
  it('should be able to create a genre', () => {
    const genre = makeGenre();
    expect(genre).toBeTruthy();
  });
});
