import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { Student } from './student.model';
import {
  Paginated,
  PaginationCriteria,
} from 'src/shared/models/paginated.model';
import { StudentMapper } from './student.mapper';

export interface FindOptions {
  id?: string;
}

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async listPaginatedStudent(
    criteria: PaginationCriteria,
  ): Promise<Paginated<Student>> {
    try {
      const { page, pageSize } = criteria;
      const [entities, total] = await this.studentRepository.findAndCount({
        order: {
          createdAt: 'DESC',
          id: 'ASC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        items: entities.map(StudentMapper.fromEntity),
        total,
      };
    } catch (e) {
      throw new Error('Cannot list paginated student');
    }
  }

  async save(student: Student): Promise<Student> {
    try {
      const studentEntity = StudentMapper.toEntity(student);
      const savedStudentEntity = await this.studentRepository.save(
        studentEntity,
      );
      return StudentMapper.fromEntity(savedStudentEntity);
    } catch (e) {
      throw new Error('Cannot save student');
    }
  }

  async findBy(options: FindOptions): Promise<Student | undefined> {
    try {
      const studentEntity = await this.studentRepository.findOne({
        ...options,
      });

      if (!studentEntity) {
        return undefined;
      }

      return StudentMapper.fromEntity(studentEntity);
    } catch (e) {
      throw new Error('Cannot find user');
    }
  }

  async delete(id: string) {
    try {
      await this.studentRepository.delete({ id });
    } catch (e) {
      throw new Error('Cannot delete student');
    }
  }
}
