import { Injectable, Logger } from '@nestjs/common';
import { Subject } from './subject.model';
import { CreateSubjectDto } from './subject.dto';
import { SubjectRepository } from './subject.repository';
import { TeacherMapper } from 'src/teacher/teacher.mapper';
import { GradeMapper } from 'src/grade/grade.mapper';
import { GradeRepository } from 'src/grade/grade.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly gradeRepository: GradeRepository
  ) { }

  async createSubject(dto: CreateSubjectDto) {
    const subject = new Subject();
    subject.name = dto.name;
    try {
      const options = { id: dto.teacherId }
      const teacher = await this.teacherRepository.findBy(options);
      subject.teacher = TeacherMapper.toEntity(teacher);
    } catch (e) {
      console.log(e);
    }

    try {
      const options = { name: dto.gradeName }
      const grade = await this.gradeRepository.findBy(options);
      subject.grade = GradeMapper.toEntity(grade)
    } catch (e) {
      console.log(e);
    }

    return await this.subjectRepository.save(subject);
  }

  async findBy(name: string) {
    const options = { name };
    return await this.subjectRepository.findBy(options);
  }
}
