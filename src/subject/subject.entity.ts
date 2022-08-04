import { GradeEntity } from 'src/grade/grade.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'subject' })
export class SubjectEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false, type: 'text' })
  public name: string;

  @ManyToOne(() => TeacherEntity, teacher => teacher.subjects)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => GradeEntity)
  @JoinColumn({ name: 'grade_id' })
  grade: GradeEntity;
}
