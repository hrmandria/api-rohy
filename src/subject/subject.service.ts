import { Injectable, Logger } from '@nestjs/common';
import { Subject } from './subject.model';
import { CreateSubjectDto } from './subject.dto';
import { SubjectRepository } from './subject.repository';
import { TeacherMapper } from 'src/teacher/teacher.mapper';
import { GradeService } from 'src/grade/grade.service';
import { GradeMapper } from 'src/grade/grade.mapper';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly teacherService: TeacherService,
    private readonly gradeService: GradeService
  ) { }

  async createSubject(dto: CreateSubjectDto) {
    const subject = new Subject();
    subject.name = dto.name;
    try {
      const teacher = await this.teacherService.findTeacher(dto.teacherId);
      subject.teacher = TeacherMapper.toEntity(teacher);
    } catch (e) {
      console.log(e);
    }

    try {
      const grade = await this.gradeService.findGrade(dto.gradeName)
      subject.grade = GradeMapper.toEntity(grade)
    } catch (e) {
      console.log(e);
    }

    return await this.subjectRepository.save(subject);
  }
}
