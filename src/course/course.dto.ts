import { DayType } from "./course.model";

export class CreateCourseDto {
    subjectName: string;
    gradeName: string;
    teacherName: string;
    day: DayType;
    from: Date;
    to: Date;
}