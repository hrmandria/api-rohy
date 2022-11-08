import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Semester, Subject } from './bulletin.model';

@Entity({ name: 'bulletin' })
export class BulletinEntity extends BaseEntity {
  @Column({ name: 'student_id', nullable: false, type: 'text' })
  public student: string;

  @Column({ name: 'note1', nullable: true, type: 'float' })
  public note1: number;

  @Column({ name: 'note2', nullable: true, type: 'float' })
  public note2: number;

  @Column({ name: 'composition', nullable: true, type: 'float' })
  public composition: number;

  @Column({ name: 'coefficient', nullable: false, type: 'integer' })
  public coefficient: number;

  @Column({ name: 'semester', nullable: false, type: 'text', enum: Semester })
  public semester: Semester;

  @Column({ name: 'subject', nullable: false, type: 'text', enum: Subject })
  public subject: Subject;

  @Column({ name: 'appreciation', nullable: true, type: 'text' })
  public appreciation: string;

  @ManyToOne(() => StudentEntity)
  @JoinColumn()
  studentEntity: StudentEntity;
}
