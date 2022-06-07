import { BaseEntity } from 'src/shared/entities/base.entity';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
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

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToMany(() => StudentEntity, (student => student.id), { cascade: true })
    @JoinTable({ name: 'student_Ids' })
    students: StudentEntity[];
}
