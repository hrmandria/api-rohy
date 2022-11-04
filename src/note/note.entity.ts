import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Semester } from './note.model';

@Entity({ name: 'note' })
export class NoteEntity extends BaseEntity {
  @Column({ name: 'student_id', nullable: false, type: 'text' })
  public student: string;

  @Column({ name: 'subject_id', nullable: false, type: 'text' })
  public subject: string;

  @Column({ name: 'value', nullable: false, type: 'float' })
  public value: number;

  @Column({ name: 'teacher_id', nullable: false, type: 'text' })
  public teacher: string;

  @Column({ name: 'coefficient', nullable: false, type: 'integer' })
  public coefficient: number;

  @Column({ name: 'semester', nullable: false, type: 'text' })
  public semester: Semester;

  @ManyToOne(() => StudentEntity)
  @JoinColumn()
  studentEntity: StudentEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn()
  subjectEntity: SubjectEntity;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn()
  teacherEntity: TeacherEntity;
}
