import { BaseEntity } from 'src/shared/entities/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';
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

  @Column({ name: 'userId', nullable: false, type: 'text' })
  public userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

}
