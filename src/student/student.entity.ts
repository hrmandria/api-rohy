import { BaseEntity } from 'src/shared/entities/base.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
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

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
