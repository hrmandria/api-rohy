import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulletinEntity } from './bulletin.entity';
import { BulletinMapper } from './bulletin.mapper';
import { Bulletin } from './bulletin.model';

@Injectable()
export class BulletinRepository {
  constructor(
    @InjectRepository(BulletinEntity)
    private readonly bulletinRepository: Repository<BulletinEntity>,
  ) { }

  async save(bulletin: Bulletin): Promise<Bulletin> {
    try {
      const bulletinEntity = BulletinMapper.toEntity(bulletin);
      const savedBulletinEntity = await this.bulletinRepository.save(bulletinEntity);
      return BulletinMapper.fromEntity(savedBulletinEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save bulletin');
    }
  }

  async findBulletinByStudent(studentId: string) {
    const bulletin = await this.bulletinRepository.findAndCount({
      relations: ["studentEntity"],
    })
    let studentsBulletin: BulletinEntity[] = []
    bulletin[0].forEach(bulletinEntity => {
      if (bulletinEntity.student == studentId) {
        studentsBulletin.push(bulletinEntity);
      }
    })
    return studentsBulletin;
  }

  async findStudentsSemesterBulletin(studentId: string, semester: string): Promise<BulletinEntity[] | undefined> {
    try {
      let semesterBulletin: BulletinEntity[] = [];
      const studentsBulletin = await this.findBulletinByStudent(studentId);
      studentsBulletin.forEach(element => {
        if (element.semester == semester) {
          semesterBulletin.push(element);
        }
      })
      if (!semesterBulletin) {
        return undefined;
      }
      return semesterBulletin;
    } catch (e) {
      console.log(e)
    }
  }

  async semesterAverage(studentId: string, semester: string): Promise<string | undefined> {
    const semesterBulletin = await this.findStudentsSemesterBulletin(studentId, semester);
    let average = 0;
    let numerator = 0;
    let coeffSum = 0;
    semesterBulletin.forEach(element => {
      numerator += (element.note1 * element.coefficient);
      coeffSum += element.coefficient;
    })
    average = numerator / coeffSum;
    return average.toFixed(3);
  }
}
