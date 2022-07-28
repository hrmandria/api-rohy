import { BaseEntity } from 'src/shared/entities/base.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Schedule } from './course.model';

@Entity()
export class CourseEntity extends BaseEntity {
  @Column({ name: 'subject', nullable: false, type: 'text' })
  public subjectName: string;

  @Column({ name: 'grade', nullable: false, type: 'text' })
  public gradeName: string;

  @Column({ name: 'teacher', nullable: false, type: 'text' })
  public teacherName: string;

  @Column({ name: 'schedule', nullable: false, type: 'daterange' })
  public schedule: Schedule;

  @OneToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;
}
