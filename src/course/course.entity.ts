import { BaseEntity } from 'src/shared/entities/base.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { TimetableEntity } from 'src/timetable/timetable.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { DayType } from './course.model';

@Entity('course')
export class CourseEntity extends BaseEntity {
  @Column({ name: 'subject', nullable: false, type: 'text' })
  public subjectName: string;

  @Column({ name: 'grade', nullable: false, type: 'text' })
  public gradeName: string;

  @Column({ name: 'teacher', nullable: false, type: 'text' })
  public teacherName: string;

  @Column({ name: 'day', nullable: false, type: 'text' })
  public day: DayType;

  @Column({ name: 'from', nullable: false, type: 'text' })
  public from: Date;

  @Column({ name: 'to', nullable: false, type: 'text' })
  public to: Date;

  @OneToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => TimetableEntity, timetable => timetable.courses)
  timetable: TimetableEntity;
}
