import { AbstractModel } from 'src/shared/models/abstract.model';
import { StudentEntity } from 'src/student/student.entity';

export class Bulletin extends AbstractModel {
  student: string;
  subject: Subject;
  note1: number;
  note2: number;
  composition: number;
  coefficient: number;
  semester: Semester;
  appreciation: string;
  studentEntity: StudentEntity;
}

export enum Semester {
  SEMESTER_ONE = "SEMESTRE 1",
  SEMESTER_TWO = "SEMESTRE 2",
  SEMESTER_THREE = "SEMESTRE 3"
}
export enum Subject {
  SUBJECT_ONE = "SUBJECT 1",
  SUBJECT_TWO = "SUBJECT 2",
  SUBJECT_THREE = "SUBJECT 3",
  SUBJECT_FOUR = "SUBJECT 4",
  SUBJECT_FIVE = "SUBJECT 5",
  SUBJECT_SIX = "SUBJECT 6",
  SUBJECT_SEVEN = "SUBJECT 7",
  SUBJECT_EIGHT = "SUBJECT 8",
  SUBJECT_NINE = "SUBJECT 9",
  SUBJECT_TEN = "SUBJECT 10",
  SUBJECT_ELEVEN = "SUBJECT 11",
  SUBJECT_TWELVE = "SUBJECT 12",
  SUBJECT_THIRTEEN = "SUBJECT 13",
  SUBJECT_FOURTEEN = "SUBJECT 14",
}
