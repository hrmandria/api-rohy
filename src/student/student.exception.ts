import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPaginationInputException extends HttpException {
  constructor(key: string, value: number) {
    super(`Invalid pagination input: ${key}: ${value}`, HttpStatus.BAD_REQUEST);
  }
}

export class CannotCreateStudentException extends HttpException {
  constructor(error: string) {
    super(`Cannot create student: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class CannotGetStudentException extends HttpException {
  constructor(error: string) {
    super(`Cannot get student: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class CannotDeleteStudentException extends HttpException {
  constructor(error: string) {
    super(`Cannot delete student: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
