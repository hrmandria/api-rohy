import { Injectable } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateStudentDto } from './student.dto';
import { InvalidPaginationInputException } from './student.exception';
import { Student, StudentStatus } from './student.model';
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

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.lastname = dto.lastname;
    student.firstname = dto.firstname;
    student.userId = dto.userId;
    student.status = StudentStatus.ACTIVE;

    return this.studentRepository.save(student);
  }
}
