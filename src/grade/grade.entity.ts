import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'grade' })
export class GradeEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false, type: 'text' })
  public name: string;

  @OneToMany(() => StudentEntity, (student) => student.id, { cascade: true, nullable: true })
  students: StudentEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.id, { cascade: true, nullable: true })
  subjects: SubjectEntity[];
}
