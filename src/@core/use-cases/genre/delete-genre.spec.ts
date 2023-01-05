import makeGenre from '@test/factories/genre-factory';
import { InMemoryGenreRepository } from '@test/repositories';
import { NotFoundError } from '../errors/';
import { DeleteGenre } from './delete-genre';

describe('Delete Genre', () => {
  it('should be able to delete a genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const deleteGenre = new DeleteGenre(genreRepo);

    const genre1 = makeGenre({}, 'c89496c6-3150-4b9a-b3f8-c72edb8a3753');
    const genre2 = makeGenre({}, 'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0');

    await genreRepo.create(genre1);
    await genreRepo.create(genre2);

    const deletedGenre = await deleteGenre.execute({
      id: 'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    });

    expect(genreRepo.genres).toHaveLength(1);
    expect(deletedGenre).toBeFalsy();
  });

  it('should not be able to delete an unexisting genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const deleteGenre = new DeleteGenre(genreRepo);

    const genre1 = makeGenre({}, 'c89496c6-3150-4b9a-b3f8-c72edb8a3753');
    const genre2 = makeGenre({}, 'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0');

    await genreRepo.create(genre1);
    await genreRepo.create(genre2);

    expect(genreRepo.genres).toHaveLength(2);
    expect(() => {
      return deleteGenre.execute({
        id: 'uhf800ed-f391-4733-b597-2a2cbc2d6360',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
