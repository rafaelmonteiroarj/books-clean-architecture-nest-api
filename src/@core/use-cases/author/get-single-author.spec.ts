import makeAuthor from '@test/factories/author-factory';
import { InMemoryAuthorRepository } from '@test/repositories/';
import { NotFoundError } from '../errors/';
import { GetSingleAuthor } from './get-single-author';

describe('Get Single Author', () => {
  it('should be able get an author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const getSingleAuthor = new GetSingleAuthor(authorRepo);
    const authorFactory = makeAuthor(
      {},
      'a475d0ac-4f21-472f-89d8-a515a8c86f50',
    );

    await authorRepo.create(authorFactory);

    const { author } = await getSingleAuthor.execute({
      id: 'a475d0ac-4f21-472f-89d8-a515a8c86f50',
    });

    expect(authorRepo.authors[0]).toEqual(author);
  });

  it('should not be able get an unexisting author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const getSingleAuthor = new GetSingleAuthor(authorRepo);
    const authorFactory = makeAuthor(
      {},
      'a475d0ac-4f21-472f-89d8-a515a8c86f50',
    );

    await authorRepo.create(authorFactory);

    expect(() => {
      return getSingleAuthor.execute({
        id: 'a475d0ac-4f21-472f-89d8-a515a8c86f20',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
