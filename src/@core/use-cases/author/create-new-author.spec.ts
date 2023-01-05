import makeAuthor from '@test/factories/author-factory';
import { InMemoryAuthorRepository } from '@test/repositories';
import { ConflictError } from '../errors/';
import { CreateNewAuthor } from './create-new-author';

describe('Create New Author', () => {
  it('should be able to create an author', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const createNewAuthor = new CreateNewAuthor(authorRepo);
    const authorFactory = makeAuthor();

    const { author } = await createNewAuthor.execute({
      firstName: authorFactory.firstName,
      lastName: authorFactory.lastName,
      email: authorFactory.email.value,
    });

    expect(author).toBeTruthy();
    expect(authorRepo.authors[0]).toEqual(author);
    expect(authorRepo.authors).toHaveLength(1);
  });

  it('should not be able to create an author with existing email', async () => {
    const authorRepo = new InMemoryAuthorRepository();
    const createNewAuthor = new CreateNewAuthor(authorRepo);

    const author1 = makeAuthor();
    const author2 = makeAuthor();

    await createNewAuthor.execute({
      firstName: author1.firstName,
      lastName: author1.lastName,
      email: author1.email.value,
    });

    expect(authorRepo.authors).toHaveLength(1);
    expect(() => {
      return createNewAuthor.execute({
        firstName: author2.firstName,
        lastName: author2.lastName,
        email: author2.email.value,
      });
    }).rejects.toThrow(ConflictError);
  });
});
