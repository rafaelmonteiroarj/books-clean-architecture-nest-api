import { Author, AuthorProps, Email } from '@core/entities/author';

type Override = Partial<AuthorProps>;

const makeAuthor = (override: Override = {}, id?: string) => {
  return new Author(
    {
      firstName: 'Pedro',
      lastName: 'Silva',
      email: new Email('teste@gmail.com'),
      ...override,
    },
    id,
  );
};

export default makeAuthor;
