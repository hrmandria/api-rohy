import { Injectable } from '@nestjs/common';
import { StudentMapper } from 'src/student/student.mapper';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectMapper } from 'src/subject/subject.mapper';
import { SubjectRepository } from 'src/subject/subject.repository';
import { CreateTeacherDto } from './teacher.dto';
import { Teacher } from './teacher.model';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectRepository: SubjectRepository,
  ) { }

  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.firstname = dto.firstname;
    teacher.lastname = dto.lastname;
    teacher.subjects = [];
    const subjectIds = dto.subjectIds;
    let subjects: SubjectEntity[] = []
    subjectIds.forEach(async (element) => {
      try {
        const options = { id: element };
        const subjectEntity = SubjectMapper.toEntity(await this.subjectRepository.findBy(options));
        subjects.push(subjectEntity)
      } catch (e) {
        console.log(e);
        throw new Error('Cannot find entity corresponding to' + element);
      }
    });
    teacher.subjects = subjects;
    return this.teacherRepository.save(teacher);
  }

  async findTeacher(id: string, name?: string) {
    const options = { id, name }
    return await this.teacherRepository.findBy(options);
  }
}
