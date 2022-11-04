import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Paginated,
  PaginationCriteria,
} from 'src/shared/models/paginated.model';
import { StudentEntity } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { GradeEntity } from './grade.entity';
import { GradeMapper } from './grade.mapper';
import { Grade } from './grade.model';

export interface FindOptions {
  id?: string;
  name?: string;
}

@Injectable()
export class GradeRepository {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
  ) { }

  async listPaginatedGrade(
    criteria: PaginationCriteria,
  ): Promise<Paginated<Grade>> {
    try {
      const { page, pageSize } = criteria;
      const [entities, total] = await this.gradeRepository.findAndCount({
        order: {
          createdAt: 'DESC',
          id: 'ASC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        items: entities.map(GradeMapper.fromEntity),
        total,
      };
    } catch (e) {
      throw new Error('Cannot list paginated grade');
    }
  }

  async findBy(options: FindOptions): Promise<Grade | undefined> {
    try {
      const gradeEntity = await this.gradeRepository.findOne({ ...options });
      if (!gradeEntity) {
        return undefined;
      }
      return GradeMapper.fromEntity(gradeEntity);
    } catch (e) {
      console.log(e);
    }
  }

  async getGradeEntity(name: string): Promise<GradeEntity | undefined> {
    return await this.gradeRepository.findOne({
      relations: ["students", "subjects"],
      where: { name }
    })
  }

  async addStudent(gradeName: string, studentsArray: StudentEntity[]) {
    const grade = GradeMapper.toEntity(await this.findBy({ name: gradeName }));
    grade.students = studentsArray;
    return await this.gradeRepository.save(grade);
  }

  async getStudentsList(options: FindOptions) {
    try {
      const gradeEntity = await this.gradeRepository.find({
        relations: ["students"],
        where: { name: options.name }
      })
      return gradeEntity[0].students;
    } catch (e) {
      console.log(e);
    }
  }

  async getSubjectsList(name: string) {
    const gradeEntity = await this.gradeRepository.find({
      relations: ["subjects"],
      where: { name }
    })
    const subjects = gradeEntity[0].subjects;
    return subjects;
  }

  async save(grade: Grade): Promise<Grade> {
    try {
      const gradeEntity = GradeMapper.toEntity(grade);
      const savedGradeEntity = await this.gradeRepository.save(gradeEntity);
      return GradeMapper.fromEntity(savedGradeEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save grade');
    }
  }
}
