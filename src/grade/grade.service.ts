import { Injectable } from '@nestjs/common';
import { StudentEntity } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectService } from 'src/subject/subject.service';
import { CreateGradeDto } from './grade.dto';
import { Grade } from './grade.model';
import { GradeRepository } from './grade.repository';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService) { }

  async createGrade(dto: CreateGradeDto) {
    const grade = new Grade();
    grade.name = dto.name;

    const studentIds = dto.studentIds;
    let students: StudentEntity[] = [];
    try {
      studentIds.forEach(async element => {
        const temp = await this.studentService.findById(element);
        students.push(temp);
      })
      grade.students = students;
    } catch (e) {
      console.log(e);
    }

    const subjectNames = dto.subjectNames;
    let subjects: SubjectEntity[] = [];
    try {
      subjectNames.forEach(async element => {
        const temp = await this.subjectService.findBy(element);
        subjects.push(temp);
      })
      grade.subjects = subjects;
    } catch (e) {
      console.log(e);
    }

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
