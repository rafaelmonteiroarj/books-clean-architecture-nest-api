import { Genre } from '@core/entities/genre';
import { GenreRepository } from '@core/repositories/';

export class InMemoryGenreRepository implements GenreRepository {
  public genres: Genre[] = [];

  async create(genre: Genre): Promise<void> {
    this.genres.push(genre);
  }

  async findById(id: string): Promise<Genre | null> {
    const genre = this.genres.find((genre) => genre.id === id);
    if (!genre) return null;

    return genre;
  }

  async update(id: string, newGenre: Genre): Promise<void> {
    const genre = this.genres.find((props) => props.id === id);
    if (!genre) throw new Error();

    genre.name = newGenre.name;
  }

  async delete(id: string): Promise<void> {
    const genres = this.genres.filter((props) => props.id !== id);
    this.genres = genres;
  }
}
