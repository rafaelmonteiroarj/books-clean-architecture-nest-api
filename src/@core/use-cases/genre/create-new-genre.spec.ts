import makeGenre from '@test/factories/genre-factory';
import { InMemoryGenreRepository } from '@test/repositories/';
import { CreateNewGenre } from './create-new-genre';

describe('Create New Genre', () => {
  it('should be able to create a genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const createNewGenre = new CreateNewGenre(genreRepo);
    const genreFactory = makeGenre();

    const { genre } = await createNewGenre.execute(genreFactory);

    expect(genre).toBeTruthy();
    expect(genreRepo.genres[0]).toEqual(genre);
    expect(genreRepo.genres).toHaveLength(1);
  });
});
