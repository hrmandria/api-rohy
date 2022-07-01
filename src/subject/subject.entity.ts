import { BaseEntity } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'subject' })
export class SubjectEntity extends BaseEntity {
    @Column({ name: 'name', nullable: false, type: 'text' })
    public name: string;

    @Column({ name: 'grade_id', nullable: true, type: 'text' })
    public gradeId: string;

}