import { AbstractModel } from 'src/shared/models/abstract.model';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { TeacherEntity } from 'src/teacher/teacher.entity';

export class Note extends AbstractModel {
  student: string;
  subject: string;
  value: number;
  teacher: string;
  coefficient: number;
  semester: Semester;
  studentEntity: StudentEntity;
  subjectEntity: SubjectEntity;
  teacherEntity: TeacherEntity;
}

export enum Semester {
  SEMESTER_ONE = "SEMESTRE 1",
  SEMESTER_TWO = "SEMESTRE 2",
  SEMESTER_THREE = "SEMESTRE 3"
}
