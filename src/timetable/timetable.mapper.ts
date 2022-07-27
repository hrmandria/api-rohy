import { TimetableEntity } from "./timetable.entity";
import { Timetable } from "./timetable.model";

export class TimetableMapper {
    public static toEntity(source: Timetable): TimetableEntity {
        const timetableEntity = new TimetableEntity();
        timetableEntity.id = source.id;
        timetableEntity.gradeName = source.gradeName;
        timetableEntity.grade = source.grade;
        timetableEntity.courses = source.courses;
        return timetableEntity;
    }

    public static fromEntity(source: TimetableEntity): Timetable {
        const timetable = new Timetable(source.id);
        timetable.gradeName = source.gradeName;
        timetable.grade = source.grade;
        timetable.courses = source.courses;
        return timetable;
    }
}