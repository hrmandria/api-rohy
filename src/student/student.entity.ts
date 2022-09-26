import { GradeEntity } from 'src/grade/grade.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ParentEntity } from 'src/parent/parent.entity';
import {
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { StudentStatus } from './student.model';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {
  @Column({ name: 'lastname', nullable: false, type: 'text' })
  public lastname: string;

  @Column({ name: 'firstname', nullable: false, type: 'text' })
  public firstname: string;

  @Column({
    name: 'status',
    nullable: false,
    type: 'text',
    enum: StudentStatus,
  })
  public status: StudentStatus;

  @Column({ name: 'user_id', nullable: false, type: 'text' })
  public userId: string;

  @ManyToMany(() => ParentEntity, (parent) => parent.id, { cascade: true })
  @JoinTable({ name: 'parent_student' })
  parents: ParentEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => GradeEntity, grade => grade.students)
  @JoinColumn({ name: 'grade_id' })
  grade: GradeEntity;
}
