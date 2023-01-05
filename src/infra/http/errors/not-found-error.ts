import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor() {
    super('Resource not found', HttpStatus.NOT_FOUND);
  }
}
