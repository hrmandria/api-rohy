import { DatabaseFileEntity } from "src/files/file.entity";
import { AbstractModel } from "src/shared/models/abstract.model";
import { StudentEntity } from "src/student/student.entity";

export enum ParentStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum ParentGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export class Parent extends AbstractModel {
    lastname: string;
    firstname: string;
    status: ParentStatus;
    gender: ParentGender;
    userId: string;
    idNumber: string;
    students: StudentEntity[];
    avatar: DatabaseFileEntity;
}