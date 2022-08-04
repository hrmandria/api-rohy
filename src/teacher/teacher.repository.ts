import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from './teacher.entity';
import { TeacherMapper } from './teacher.mapper';
import { Teacher } from './teacher.model';

export interface FindOptions {
  id?: string;
  lastname?: string;
}

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
  ) { }

  async save(teacher: Teacher): Promise<Teacher> {
    try {
      const teacherEntity = TeacherMapper.toEntity(teacher);
      const savedTeacherEntity = await this.teacherRepository.save(
        teacherEntity,
      );
      return TeacherMapper.fromEntity(savedTeacherEntity);
    } catch (e) {
      throw new Error('Cannot save teacher');
    }
  }

  async findBy(options: FindOptions): Promise<Teacher | undefined> {
    try {
      const teacherEntity = await this.teacherRepository.findOne({
        ...options,
      });

      if (!teacherEntity) {
        return undefined;
      }

      return TeacherMapper.fromEntity(teacherEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot find teacher');
    }
  }
}
