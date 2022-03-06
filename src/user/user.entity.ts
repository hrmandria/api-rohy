import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'id_number', nullable: false, type: 'text' })
  @Index({ unique: true })
  public idNumber: string;

  @Column({ name: 'password', nullable: false, type: 'text' })
  public password: string;
}
