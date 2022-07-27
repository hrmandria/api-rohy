import { CourseEntity } from "src/course/course.entity";
import { GradeEntity } from "src/grade/grade.entity";
import { BaseEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class TimetableEntity extends BaseEntity {
    @Column({ name: "grade", nullable: false, type: "text" })
    public gradeName: string;

    @OneToOne(() => GradeEntity)
    @JoinColumn({ name: "grade_id" })
    grade: GradeEntity

    @OneToMany(() => CourseEntity, (course) => course.id, { cascade: true })
    courses: CourseEntity[];
}