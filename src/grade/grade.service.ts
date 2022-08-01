import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './grade.dto';
import { Grade } from './grade.model';
import { GradeRepository } from './grade.repository';

@Injectable()
export class GradeService {
  constructor(private readonly gradeRepository: GradeRepository) { }

  async createGrade(dto: CreateGradeDto) {
    const grade = new Grade();
    grade.name = dto.name;
    grade.students = dto.students;
    grade.subjects = dto.subjects;

    return this.gradeRepository.save(grade);
  }

  async findGrade(name: string) {
    const options = {
      name: name
    }
    return await this.gradeRepository.findBy(options);
  }

  async getStudents(name: string) {
    const options = {
      name: name
    }
    return await this.gradeRepository.getStudentsList(name);
  }

  async getSubjects(name: string) {
    return await this.gradeRepository.getSubjectsList(name);
  }
}
