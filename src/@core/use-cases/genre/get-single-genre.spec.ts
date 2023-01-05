import makeGenre from '@test/factories/genre-factory';
import { InMemoryGenreRepository } from '@test/repositories/';
import { NotFoundError } from '../errors';
import { GetSingleGenre } from './get-single-genre';

describe('Get Single Genre', () => {
  it('should be able to get a genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const getSingleGenre = new GetSingleGenre(genreRepo);

    const genreFactory = makeGenre({}, '85d25aea-ce57-486e-b145-7407d1867a00');
    await genreRepo.create(genreFactory);

    const { genre } = await getSingleGenre.execute({
      id: '85d25aea-ce57-486e-b145-7407d1867a00',
    });

    expect(genreRepo.genres[0]).toEqual(genre);
  });

  it('should not be able get an unexisting genre', async () => {
    const genreRepo = new InMemoryGenreRepository();
    const getSingleGenre = new GetSingleGenre(genreRepo);

    const genreFactory = makeGenre({}, '85d25aea-ce57-486e-b145-7407d1867a00');
    await genreRepo.create(genreFactory);

    expect(() => {
      return getSingleGenre.execute({
        id: 'a475d0ac-4f21-472f-89d8-a515a8c86f20',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
