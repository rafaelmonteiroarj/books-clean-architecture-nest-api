import makeAuthor from '@test/factories/author-factory';
import { InMemoryAuthorRepository } from '@test/repositories/';
import { NotFoundError } from '../errors';
import { UpdateAuthor } from './update-author';

describe('Update Author', () => {
  it('should be able to update an author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const updateAuthor = new UpdateAuthor(authorRepo);

    const author1 = makeAuthor(
      {
        firstName: 'Lucas',
      },
      '240f85d8-892b-4fe2-aa40-deaff8631a65',
    );
    const author2 = makeAuthor(
      {
        firstName: 'Amanda',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await authorRepo.create(author1);
    await authorRepo.create(author2);

    const updatedAuthor2 = makeAuthor({
      firstName: 'Amanda updated',
    });

    await updateAuthor.execute('c89496c6-3150-4b9a-b3f8-c72edb8a3ea0', {
      firstName: updatedAuthor2.firstName,
      lastName: updatedAuthor2.lastName,
      email: updatedAuthor2.email.value,
    });

    expect(authorRepo.authors[1]).toBeTruthy();
    expect(authorRepo.authors[1]).toEqual(
      expect.objectContaining({
        firstName: 'Amanda updated',
      }),
    );
  });

  it('should not be able to update an unexisting author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const updateAuthor = new UpdateAuthor(authorRepo);

    const author1 = makeAuthor(
      {
        firstName: 'Lucas',
      },
      '240f85d8-892b-4fe2-aa40-deaff8631a65',
    );
    const author2 = makeAuthor(
      {
        firstName: 'Amanda',
      },
      'c89496c6-3150-4b9a-b3f8-c72edb8a3ea0',
    );

    await authorRepo.create(author1);
    await authorRepo.create(author2);

    const updatedAuthor2 = makeAuthor({
      firstName: 'Amanda updated',
    });

    expect(() => {
      return updateAuthor.execute('c89496c6-3150-4b9a-b3f8-c72edb8a3777', {
        firstName: updatedAuthor2.firstName,
        lastName: updatedAuthor2.lastName,
        email: updatedAuthor2.email.value,
      });
    }).rejects.toThrow(NotFoundError);
  });
});
