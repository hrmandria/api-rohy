import { Injectable } from '@nestjs/common';
import { Subject } from './subject.model';
import { UserRepository } from 'src/user/user.repository';
import { CreateSubjectDto } from './subject.dto';
import { SubjectRepository } from './subject.repository';
import { UserMapper } from 'src/user/user.mapper';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createSubject(dto: CreateSubjectDto) {
    const subject = new Subject();
    subject.name = dto.name;
    const teacherFindOptions = { idNumber: dto.teacherId, email: '' };
    try {
      const teacher = await this.userRepository.findBy(teacherFindOptions);
      subject.teacher = UserMapper.toEntity(teacher);
    } catch (e) {
      throw new Error('Teacher with ' + dto.teacherId + 'id not found.');
    }
  }
}
