import { Injectable } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateUserDto } from 'src/user/user.dto';
import { UserMapper } from 'src/user/user.mapper';
import { UserService } from 'src/user/user.service';
import { CreateStudentDto } from './student.dto';
import { InvalidPaginationInputException } from './student.exception';
import { Student, StudentStatus } from './student.model';
import { FindOptions, StudentRepository } from './student.repository';

const maxPageSize = 250;

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly userService: UserService,
  ) { }

  async listPaginatedStudent(criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }
    return this.studentRepository.listPaginatedStudent(criteria);
  }

  async findStudent(studentId: string) {
    const options = { id: studentId }
    return await this.studentRepository.findBy(options);
  }

  async createStudent(dto: CreateStudentDto) {
    const student = new Student();
    student.lastname = dto.lastname;
    student.firstname = dto.firstname;
    const idNumber = await this.userService.generateIdNumber();
    const createUserDto: CreateUserDto = {
      idNumber: idNumber,
      email: dto.email,
      password: dto.password,
    };
    const user = UserMapper.toEntity(
      await this.userService.createUser(createUserDto),
    );
    student.userId = user.id;
    student.status = StudentStatus.ACTIVE;
    return this.studentRepository.save(student);
  }

  async findParents(id: string) {
    return await this.studentRepository.findParent(id);
  }

  async deleteStudent(id: string) {
    this.studentRepository.delete(id);
  }
}
