import { Injectable } from '@nestjs/common';
import { StudentMapper } from 'src/student/student.mapper';
import { StudentRepository } from 'src/student/student.repository';
import { CreateBulletinDto } from './bulletin.dto';
import { Bulletin } from './bulletin.model';
import { BulletinRepository } from './bulletin.repository';

@Injectable()
export class BulletinService {
  constructor(
    private readonly bulletinRepository: BulletinRepository,
    private readonly studentRepository: StudentRepository,
  ) { }

  async createBulletin(dto: CreateBulletinDto) {
    const bulletin = new Bulletin();
    bulletin.student = dto.studentId;
    bulletin.note1 = dto.note1;
    bulletin.note2 = dto.note2;
    bulletin.composition = dto.composition;
    bulletin.coefficient = dto.coefficient;
    bulletin.semester = dto.semester;
    bulletin.subject = dto.subject;
    bulletin.appreciation = dto.appreciation;
    bulletin.studentEntity = StudentMapper.toEntity(await this.studentRepository.findBy({ id: dto.studentId }));
    return this.bulletinRepository.save(bulletin);
  }

  async getBulletinByStudent(studentId: string) {
    return await this.bulletinRepository.findBulletinByStudent(studentId);
  }

  async semesterBulletin(studentId: string, semester: string) {
    return await this.bulletinRepository.findBulletin(studentId, semester);
  }

  async studentsSemesterAverage(studentId: string, semester: string) {
    return await this.bulletinRepository.semesterAverage(studentId, semester);
  }
}
