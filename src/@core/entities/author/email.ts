export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  constructor(email: string) {
    const result = this.isEmailValid(email);
    if (!result) throw new Error('Email not valid.');

    this.email = email;
  }
}
