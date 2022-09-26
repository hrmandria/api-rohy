import { AbstractModel } from 'src/shared/models/abstract.model';
import { SubjectEntity } from 'src/subject/subject.entity';

export class Teacher extends AbstractModel {
  firstname: string;
  lastname: string;
  userId: string;
  idNumber: string;
  subjects: SubjectEntity[];
}
