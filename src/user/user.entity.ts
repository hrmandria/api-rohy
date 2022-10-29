import { BaseEntity } from 'src/shared/entities/base.entity';
import { Nullable } from 'src/shared/utils/type';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'id_number', nullable: true, unique: true, type: 'text' })
  @Index({ unique: true })
  public idNumber: Nullable<string>;

  @Column({ name: 'email', nullable: true, unique: true, type: 'text' })
  @Index({ unique: true })
  public email: Nullable<string>;

  @Column({ name: 'password', nullable: false, type: 'text' })
  public password: string;

  @Column({ name: 'password', nullable: false, type: 'text' })
  public role: number;
}
