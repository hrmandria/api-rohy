import { StudentEntity } from "src/student/student.entity";
import { SubjectEntity } from "src/subject/subject.entity";

export interface CreateGradeDto {
    name: string;
    students: StudentEntity[]
    subjects: SubjectEntity[]
}