import { Genre, GenreProps } from '@core/entities/genre';

type Override = Partial<GenreProps>;

const makeGenre = (override: Override = {}, id?: string) => {
  return new Genre({ name: 'Action', ...override }, id);
};

export default makeGenre;
