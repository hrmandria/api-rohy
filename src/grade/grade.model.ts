import { AbstractModel } from 'src/shared/models/abstract.model';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';

export class Grade extends AbstractModel {
  name: string;
  students: StudentEntity[];
  subjects: SubjectEntity[];
}

export enum SectionType {
  SECTION_1 = "SECTION 1",
  SECTION_2 = "SECTION 2"
}
