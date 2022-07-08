import { GradeEntity } from "src/grade/grade.entity";
import { AbstractModel } from "src/shared/models/abstract.model";
import { UserEntity } from "src/user/user.entity";

export class Subject extends AbstractModel {
    name: string;
    teacher: UserEntity;
    grade: GradeEntity;
}