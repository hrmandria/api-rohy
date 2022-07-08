import { GradeEntity } from "src/grade/grade.entity";
import { UserEntity } from "src/user/user.entity";

export interface CreateSubjectDto {
    name: string;
    teacherId: string;
    gradeId: string;
}

export interface CreateSubjectModel {
    name: string;
    teacher: UserEntity;
    grade: GradeEntity;
}