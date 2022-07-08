import { StudentEntity } from "src/student/student.entity";

export interface CreateGradeDto {
    name: string;
    students: StudentEntity[]
}