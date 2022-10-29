import { DatabaseFileEntity } from 'src/files/file.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'admin' })
export class AdminEntity extends BaseEntity {
  @Column({ name: 'lastname', nullable: false, type: 'text' })
  public name: string;

  @Column({ name: 'user_id', nullable: false, type: 'text' })
  public userId: string;

  @Column({ name: 'email', nullable: true, type: 'text' })
  public email: string;

  @Column({ name: 'id_number', nullable: false, type: 'text' })
  public idNumber: string;

  @Column({ name: 'phone', nullable: false, type: 'text' })
  public phone: string;

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
}
