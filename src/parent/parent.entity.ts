import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ParentStatus } from './parent.model';

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

    @Column({ name: 'student_Ids', nullable: false, type: 'array' })
    public studentIds: [string];

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => StudentEntity, () => ParentEntity)
    @JoinColumn({ name: 'student_Ids' })
    student: [StudentEntity];
}
