import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotFindUserException extends HttpException {
  constructor(idNumber: string) {
    super(`Cannot find with ID number: ${idNumber}`, HttpStatus.NOT_FOUND);
  }
}

export class CannotFindTokenUserException extends HttpException {
  constructor(token: string) {
    super(`Cannot find with ID number: ${token}`, HttpStatus.NOT_FOUND);
  }
}

export class PasswordMismatchException extends HttpException {
  constructor() {
    super(`Password mismatch`, HttpStatus.BAD_REQUEST);
  }
}
