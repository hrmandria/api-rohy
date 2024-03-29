import { ParentEntity } from 'src/parent/parent.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TicketType } from './ticket.model';

@Entity({ name: 'ticket' })
export class TicketEntity extends BaseEntity {
  @Column({ name: 'from', nullable: false, type: 'date' })
  public from: Date;

  @Column({ name: 'to', nullable: true, type: 'date' })
  public to: Date;

  @Column({ name: 'cause', nullable: true, type: 'text' })
  public reason: string;

  @Column({ name: 'decision', nullable: true, type: 'text' })
  public decision: string;

  @Column({ name: 'text', nullable: true, type: 'text' })
  public text: string;

  @Column({ name: 'points_number', nullable: true, type: 'integer' })
  public pointsNumber: number;

  @Column({ name: 'manager_signature', nullable: true, type: 'text' })
  public managerSignature: boolean;

  @Column({ name: 'parent_signature', nullable: true, type: 'text' })
  public parentSignature: boolean;

  @Column({ name: 'type', nullable: false, type: 'text', enum: TicketType })
  public type: TicketType;

  @Column({ name: 'student_id', nullable: false, type: 'text' })
  public studentId: string;

  @Column({ name: 'manager_id', nullable: true, type: 'text' })
  public managerId: string;

  @Column({ name: 'parent_id', nullable: true, type: 'text' })
  public parentId: string;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => ParentEntity)
  @JoinColumn({ name: 'parent_id' })
  parent: ParentEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'manager_id' })
  manager: UserEntity;
}
