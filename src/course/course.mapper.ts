import { CourseEntity } from "./course.entity";
import { Course } from "./course.model";

export class CourseMapper {
    public static fromEntity(source: CourseEntity): Course {
        const course = new Course(source.id)
        course.subject = source.subjectName;
        course.grade = source.gradeName;
        course.teacher = source.teacherName;
        course.day = source.day;
        course.from = source.from;
        course.to = source.to;
        return course;
    }

    public static toEntity(source: Course): CourseEntity {
        const courseEntity = new CourseEntity();
        courseEntity.id = source.id;
        courseEntity.subjectName = source.subject;
        courseEntity.gradeName = source.grade;
        courseEntity.teacherName = source.teacher;
        courseEntity.day = source.day;
        courseEntity.from = source.from;
        courseEntity.to = source.to
        return courseEntity;
    }
}