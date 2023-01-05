import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictError extends HttpException {
  constructor() {
    super('Email already registered', HttpStatus.CONFLICT);
  }
}
