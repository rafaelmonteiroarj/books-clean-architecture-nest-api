import makeGenre from '@test/factories/genre-factory';
import { InMemoryGenreRepository } from '@test/repositories/';
import { NotFoundError } from '../errors';
import { UpdateGenre } from './update-genre';

describe('Update Genre', () => {
  it('should be able to update an genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const updateGenre = new UpdateGenre(genreRepo);

    const genre1 = makeGenre(
      {
        name: 'Action',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3753',
    );
    const genre2 = makeGenre(
      {
        name: 'Terror',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await genreRepo.create(genre1);
    await genreRepo.create(genre2);

    const updatedGenre2 = makeGenre({
      name: 'Terror updated',
    });

    await updateGenre.execute(
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
      updatedGenre2,
    );

    expect(genreRepo.genres[1]).toBeTruthy();
    expect(genreRepo.genres[1]).toEqual(
      expect.objectContaining({
        id: 'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
        name: 'Terror updated',
      }),
    );
  });

  it('should not be able to update an unexisting genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const updateGenre = new UpdateGenre(genreRepo);

    const genre1 = makeGenre(
      {
        name: 'Action',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3753',
    );
    const genre2 = makeGenre(
      {
        name: 'Terror',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await genreRepo.create(genre1);
    await genreRepo.create(genre2);

    const updatedGenre2 = makeGenre({
      name: 'Terror updated',
    });

    expect(() => {
      return updateGenre.execute(
        'c89496c6-3150-4b9a-b3f8-c72edb8a3777',
        updatedGenre2,
      );
    }).rejects.toThrow(NotFoundError);
  });
});
