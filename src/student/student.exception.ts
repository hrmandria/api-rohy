import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPaginationInputException extends HttpException {
  constructor(key: string, value: number) {
    super(`Invalid pagination input: ${key}: ${value}`, HttpStatus.BAD_REQUEST);
  }
}
