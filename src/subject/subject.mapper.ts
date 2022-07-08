import { SubjectEntity } from "./subject.entity";
import { Subject } from "./subject.model";

export class SubjectMapper {
    public static toEntity(source: Subject): SubjectEntity {
        const subjectEntity = new SubjectEntity();
        subjectEntity.id = source.id;
        subjectEntity.name = source.name;
        subjectEntity.grade = source.grade;
        subjectEntity.teacher = source.teacher;

        return subjectEntity;
    }

    public static fromEntity(source: SubjectEntity): Subject {
        const subject = new Subject(source.id)
        subject.name = source.name;
        subject.grade = source.grade;
        subject.teacher = source.teacher;

        return subject;
    }
}