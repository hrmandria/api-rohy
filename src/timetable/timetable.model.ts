import { CourseEntity } from 'src/course/course.entity';
import { GradeEntity } from 'src/grade/grade.entity';
import { AbstractModel } from 'src/shared/models/abstract.model';

export class Timetable extends AbstractModel {
  gradeName: string;
  grade: GradeEntity;
  courses: CourseEntity[];
}
