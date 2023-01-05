import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/';

export interface BookProps {
  title: string;
  description: string;
  authorId: string;
  genreId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Book {
  private _id: string;
  private props: BookProps;

  constructor(
    props: Replace<
      BookProps,
      {
        authorId?: string;
        genreId?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      authorId: props.authorId ?? randomUUID(),
      genreId: props.genreId ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }

  public get description(): string {
    return this.props.description;
  }
  public set description(description: string) {
    this.props.description = description;
  }

  public get authorId(): string {
    return this.props.authorId;
  }

  public get genreId(): string {
    return this.props.genreId;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
