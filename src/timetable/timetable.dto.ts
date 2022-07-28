import { CourseEntity } from 'src/course/course.entity';
import { GradeEntity } from 'src/grade/grade.entity';

export interface CreateTimetableDto {
  grade: GradeEntity;
  courses: CourseEntity[];
}
