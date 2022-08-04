import { AbstractModel } from 'src/shared/models/abstract.model';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { TeacherEntity } from 'src/teacher/teacher.entity';

export class Note extends AbstractModel {
  student: string;
  subject: string;
  value: number;
  teacher: string;
  studentEntity: StudentEntity;
  subjectEntity: SubjectEntity;
  teacherEntity: TeacherEntity;
}
