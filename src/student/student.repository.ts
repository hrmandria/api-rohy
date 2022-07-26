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
<<<<<<< HEAD
import { ParentEntity } from 'src/parent/parent.entity';
=======
>>>>>>> a83093cc848116165534dc252b2580efb11f2276

export interface FindOptions {
  id?: string;
}

export interface AddParent {
  parents: ParentEntity[];
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
      console.log(studentEntity.parents);
      return StudentMapper.fromEntity(savedStudentEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save student');
    }
  }

  async findBy(options: FindOptions): Promise<Student | undefined> {
    try {
      const student = await this.studentRepository.findByIds([options.id]);
      if (!student) {
        return undefined;
      }
      const map = StudentMapper.fromEntity(student[0]);
      return map;
    } catch (e) {
      throw new Error('Cannot find student');
    }
  }

  async updateParents(parent: ParentEntity, id: string) {
    const opt = { id: id }
    const student = await this.findBy(opt);
    student.parents = [];
    console.log(student.parents)
    student.parents.push(parent)
    const change = {
      parents: student.parents
    }
    console.log(change);
    await this.studentRepository.update({ id }, { ...change })
  }

  async delete(id: string) {
    try {
      await this.studentRepository.delete({ id });
    } catch (e) {
      throw new Error('Cannot delete student');
    }
  }
}
