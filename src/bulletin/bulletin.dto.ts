import { Semester, Subject } from './bulletin.model';

export interface CreateBulletinDto {
  studentId: string;
  note1: number;
  note2: number;
  composition: number;
  coefficient: number;
  semester: Semester;
  subject: Subject;
  appreciation: string;
}
