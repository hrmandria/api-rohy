import { Injectable } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { InvalidPaginationInputException } from './student.exception';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async listPaginatedStudent(criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }

    return this.studentRepository.listPaginatedStudent(criteria);
  }
}
