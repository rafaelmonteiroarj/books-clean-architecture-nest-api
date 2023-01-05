import { Book, BookProps } from '@core/entities/book';

type Override = Partial<BookProps>;

const makeBook = (override: Override = {}, id?: string) => {
  return new Book(
    {
      title: 'Programador de Sucesso',
      description: 'Livro sobre dicas de programação',
      ...override,
    },
    id,
  );
};

export default makeBook;
