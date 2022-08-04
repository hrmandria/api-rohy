import { ParentEntity } from 'src/parent/parent.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
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

  @Column({ name: 'id_number', nullable: false, type: 'text' })
  public idNumber: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.id, { cascade: true })
  @JoinColumn()
  tickets: TicketEntity[];

  @ManyToMany(() => ParentEntity, (parent) => parent.id)
  @JoinTable()
  parents: ParentEntity[]

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

}
