export class ConflictError extends Error {
  constructor() {
    super('Email already registered');
  }
}
