import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/';
import { Email } from './email';

export interface AuthorProps {
  firstName: string;
  lastName: string;
  email: Email;
  createdAt: Date;
  updatedAt: Date;
}

export class Author {
  private _id: string;
  private props: AuthorProps;

  constructor(
    props: Replace<
      AuthorProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
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

  public get firstName(): string {
    return this.props.firstName;
  }
  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }
  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get email(): Email {
    return this.props.email;
  }
  public set email(email: Email) {
    this.props.email = email;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
