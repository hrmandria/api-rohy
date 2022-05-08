import { Injectable } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateStudentDto } from './student.dto';
import {
  CannotCreateStudentException,
  CannotDeleteStudentException,
  CannotGetStudentException,
  InvalidPaginationInputException,
} from './student.exception';
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
    try {
      const student = new Student();
      student.lastname = dto.lastname;
      student.firstname = dto.firstname;
      student.userId = dto.userId;
      student.status = StudentStatus.ACTIVE;

      return this.studentRepository.save(student);
    } catch (e) {
      throw new CannotCreateStudentException(e);
    }
  }

  async getStudent(id: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findBy({ id });
      if (!student) {
        throw new CannotGetStudentException(
          `Student with id ${id} was not found`,
        );
      }

      return student;
    } catch (e) {
      throw new CannotGetStudentException(e);
    }
  }

  async deleteStudent(id: string) {
    try {
      const student = await this.studentRepository.findBy({ id });
      if (!student) {
        throw new CannotDeleteStudentException(
          `Student with id ${id} was not found`,
        );
      }

      student.status = StudentStatus.INACTIVE;
      return this.studentRepository.save(student);
    } catch (e) {
      throw new CannotDeleteStudentException(e);
    }
  }
}
