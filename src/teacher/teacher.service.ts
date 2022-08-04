import { Injectable } from '@nestjs/common';
import { StudentMapper } from 'src/student/student.mapper';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectMapper } from 'src/subject/subject.mapper';
import { SubjectRepository } from 'src/subject/subject.repository';
import { SubjectService } from 'src/subject/subject.service';
import { CreateUserDto } from 'src/user/user.dto';
import { UserMapper } from 'src/user/user.mapper';
import { UserService } from 'src/user/user.service';
import { CreateTeacherDto } from './teacher.dto';
import { Teacher } from './teacher.model';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectService: SubjectService,
    private readonly userService: UserService
  ) { }

  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.firstname = dto.firstname;
    teacher.lastname = dto.lastname;
    teacher.subjects = [];
    const subjectNames = dto.subjectNames;
    let subjects: SubjectEntity[] = []
    subjectNames.forEach(async (element) => {
      try {
        const subjectEntity = SubjectMapper.toEntity(await this.subjectService.findBy(element));
        subjects.push(subjectEntity)
      } catch (e) {
        console.log(e);
        throw new Error('Cannot find entity corresponding to' + element);
      }
    });
    teacher.subjects = subjects;

    const idNumber = await this.userService.generateIdNumber();
    const createUserDto: CreateUserDto = {
      idNumber: idNumber,
      email: dto.email,
      password: dto.password,
    };
    const user = UserMapper.toEntity(
      await this.userService.createUser(createUserDto),
    );
    teacher.userId = user.id;
    teacher.idNumber = user.idNumber;

    return this.teacherRepository.save(teacher);
  }

  async findTeacher(id?: string, lastname?: string) {
    const options = { id, lastname }
    return await this.teacherRepository.findBy(options);
  }
}
