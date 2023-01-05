import { Email } from './email';

describe('Author Email', () => {
  it('should be able to create an valid Email', () => {
    const validEmail = new Email('test@gmail.com');
    expect(validEmail).toBeTruthy();
  });

  it('should not be able to create an invalid email', () => {
    expect(() => new Email('invalid@gmailcom')).toThrow();
  });
});
