import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/';

export interface GenreProps {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Genre {
  private _id: string;
  private props: GenreProps;

  constructor(
    props: Replace<GenreProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(genre: string) {
    this.props.name = genre;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
