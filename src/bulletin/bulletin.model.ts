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
  SEMESTER_ONE = "TRIMESTRE 1",
  SEMESTER_TWO = "TRIMESTRE 2",
  SEMESTER_THREE = "TRIMESTRE 3"
}
export enum Subject {
  SUBJECT_ONE = "PHILOSOPHIE",
  SUBJECT_TWO = "FRANCAIS",
  SUBJECT_THREE = "MALAGASY",
  SUBJECT_FOUR = "ANGLAIS",
  SUBJECT_FIVE = "ALLEMAND",
  SUBJECT_SIX = "ESPAGNOL",
  SUBJECT_SEVEN = "INSTRUCTION CIVIQUE",
  SUBJECT_EIGHT = "HISTOIRE GEOGRAPHIE",
  SUBJECT_NINE = "MANDARIN",
  SUBJECT_TEN = "MATHEMATIQUES",
  SUBJECT_ELEVEN = "SCIENCES PHYSIQUES",
  SUBJECT_TWELVE = "E.P.S",
  SUBJECT_THIRTEEN = "SCIENCES NATURELLES",
  SUBJECT_FOURTEEN = "TRAVAUX PRATIQUES",
}
