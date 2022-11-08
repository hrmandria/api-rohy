import { BulletinEntity } from './bulletin.entity';
import { Bulletin } from './bulletin.model';

export class BulletinMapper {
  public static fromEntity(source: BulletinEntity): Bulletin {
    const bulletin = new Bulletin(source.id);
    bulletin.student = source.student;
    bulletin.subject = source.subject;
    bulletin.note1 = source.note1;
    bulletin.note2 = source.note2;
    bulletin.composition = source.composition;
    bulletin.semester = source.semester;
    bulletin.appreciation = source.appreciation;
    bulletin.coefficient = source.coefficient;
    bulletin.studentEntity = source.studentEntity;
    return bulletin;
  }

  public static toEntity(source: Bulletin): BulletinEntity {
    const bulletinEntity = new BulletinEntity();
    bulletinEntity.student = source.student;
    bulletinEntity.subject = source.subject;
    bulletinEntity.note1 = source.note1;
    bulletinEntity.note2 = source.note2;
    bulletinEntity.composition = source.composition;
    bulletinEntity.semester = source.semester;
    bulletinEntity.appreciation = source.appreciation;
    bulletinEntity.coefficient = source.coefficient;
    bulletinEntity.studentEntity = source.studentEntity;
    return bulletinEntity;
  }
}
