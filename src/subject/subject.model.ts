import { GradeEntity } from 'src/grade/grade.entity';
import { AbstractModel } from 'src/shared/models/abstract.model';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { UserEntity } from 'src/user/user.entity';

export class Subject extends AbstractModel {
  name: string;
  teacher: TeacherEntity;
  grade: GradeEntity;
}
