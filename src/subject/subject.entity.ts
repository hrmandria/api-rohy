import { GradeEntity } from "src/grade/grade.entity";
import { BaseEntity } from "src/shared/entities/base.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({ name: 'subject' })
export class SubjectEntity extends BaseEntity {
    @Column({ name: 'name', nullable: false, type: 'text' })
    public name: string;

    @Column({ name: 'grade_id', nullable: true, type: 'text' })
    public gradeId: string;

    @Column({ name: 'teacher_id', nullable: false, type: 'text' })
    public teacherId: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'teacher_id' })
    user: UserEntity;

    @OneToOne(() => GradeEntity)
    @JoinColumn({ name: 'grade_id' })
    grade: GradeEntity;
}