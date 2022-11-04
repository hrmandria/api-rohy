import { BaseEntity } from 'src/shared/entities/base.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity extends BaseEntity {
  @Column({ name: 'firstname', nullable: false, type: 'text' })
  public firstname: string;

  @Column({ name: 'lastname', nullable: false, type: 'text' })
  public lastname: string;

  @Column({ name: 'user_id', nullable: false, type: 'text' })
  public userId: string;

  @Column({ name: 'id_number', nullable: false, type: 'text' })
  public idNumber: string;

  @OneToMany(() => SubjectEntity, (subject) => subject.teacher)
  subjects: SubjectEntity[];
}
