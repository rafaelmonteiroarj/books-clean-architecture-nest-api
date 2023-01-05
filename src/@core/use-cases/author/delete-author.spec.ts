import makeAuthor from '@test/factories/author-factory';
import { InMemoryAuthorRepository } from '@test/repositories';
import { NotFoundError } from '../errors/';
import { DeleteAuthor } from './delete-author';

describe('Delete Author', () => {
  it('should be able to delete an author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const deleteAuthor = new DeleteAuthor(authorRepo);

    const author1 = makeAuthor({}, 'abf800ed-f391-4733-b597-2a2cbc2d6381');
    const author2 = makeAuthor({}, 'fd7f7559-0616-4454-af21-e1a93d26c07e');

    await authorRepo.create(author1);
    await authorRepo.create(author2);

    const deletedAuthor = await deleteAuthor.execute({
      id: 'abf800ed-f391-4733-b597-2a2cbc2d6381',
    });

    expect(authorRepo.authors).toHaveLength(1);
    expect(deletedAuthor).toBeFalsy();
  });

  it('should not be able to delete an unexisting author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const deleteAuthor = new DeleteAuthor(authorRepo);

    const author1 = makeAuthor({}, 'abf800ed-f391-4733-b597-2a2cbc2d6381');
    const author2 = makeAuthor({}, 'fd7f7559-0616-4454-af21-e1a93d26c07e');

    await authorRepo.create(author1);
    await authorRepo.create(author2);

    expect(authorRepo.authors).toHaveLength(2);
    expect(() => {
      return deleteAuthor.execute({
        id: 'uhf800ed-f391-4733-b597-2a2cbc2d6360',
      });
    }).rejects.toThrow(NotFoundError);
  });
});
