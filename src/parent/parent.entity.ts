import { DatabaseFileEntity } from 'src/files/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { ParentGender, ParentStatus } from './parent.model';

@Entity({ name: 'parent' })
export class ParentEntity extends BaseEntity {
  @Column({ name: 'lastname', nullable: false, type: 'text' })
  public lastname: string;

  @Column({ name: 'firstname', nullable: false, type: 'text' })
  public firstname: string;

  @Column({
    name: 'status',
    nullable: false,
    type: 'text',
    enum: ParentStatus,
  })
  public status: ParentStatus;

  @Column({ name: 'user_id', nullable: false, type: 'text' })
  public userId: string;

  @Column({ name: 'id_number', nullable: false, type: 'text' })
  public idNumber: string;

  @Column({ name: 'phone', nullable: false, type: 'text' })
  public phone: string;

  @Column({ name: 'gender', nullable: false, type: 'text', enum: ParentGender })
  public gender: ParentGender;

  @Column({ name: 'avatar_id', nullable: true, type: 'text' })
  public avatarId?: string;

  @Column({ name: 'is_phone_number_confirmed', default: false })
  public isPhoneNumberConfirmed: boolean;

  @OneToOne(() => DatabaseFileEntity)
  @JoinColumn({ name: 'avatar' })
  public avatar: DatabaseFileEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToMany(() => StudentEntity, (student) => student.id, { cascade: true })
  @JoinTable({ name: 'parent_student' })
  students: StudentEntity[];
}
