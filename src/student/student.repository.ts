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

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async listPaginatedStudent(
    criteria: PaginationCriteria,
  ): Promise<Paginated<Student>> {
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
  }
}
