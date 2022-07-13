import { AbstractModel } from "src/shared/models/abstract.model";

export class Note extends AbstractModel {
    studentId: string;
    subjectId: string;
    value: number;
    teacherId: string;
}