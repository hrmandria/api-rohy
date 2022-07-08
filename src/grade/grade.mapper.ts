import { SubjectEntity } from "src/subject/subject.entity";
import { GradeEntity } from "./grade.entity";
import { Grade } from "./grade.model";

export class GradeMapper {
    public static toEntity(source: Grade): GradeEntity {
        const gradeEntity = new GradeEntity();
        gradeEntity.id = source.id;
        gradeEntity.name = source.name;
        gradeEntity.students = source.students;
        gradeEntity.subjects = source.subjects;

        return gradeEntity;
    }
}