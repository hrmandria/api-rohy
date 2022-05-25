/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Nullable } from 'src/shared/utils/type';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { TicketType } from './ticket.model';

@Entity({ name: 'ticket' })
export class TicketEntity extends BaseEntity {
  @Column({ name: 'id_number', nullable: true, unique: true, type: 'text' })
  @Index({ unique: true })
  public idNumber: Nullable<string>;

  @Column({ name: 'from', nullable: false, type: 'date' })
  public from: Date;

  @Column({ name: 'to', nullable: true, type: 'date' })
  public to: Date;

  @Column({ name: 'cause', nullable: false, type: 'text' })
  public cause: string;

  @Column({ name: 'decision', nullable: true, type: 'text' })
  public decision: string;

  @Column({ name: 'pointsNumber', nullable: true, type: 'integer' })
  public pointsNumber: number;

  @Column({ name: 'managerSignature', nullable: true, type: 'text' })
  public managerSignature: boolean;

  @Column({ name: 'parentSignature', nullable: true, type: 'text' })
  public parentSignature: boolean;

  @Column({ name: 'managerId', nullable: false, type: 'text' })
  public managerId: string;

  @Column({ name: 'parentId', nullable: false, type: 'text' })
  public parentId: string;

  @Column({ name: 'type', nullable: false, type: 'text', enum: TicketType })
  public type: TicketType;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
