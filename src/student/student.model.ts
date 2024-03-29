import { ParentEntity } from 'src/parent/parent.entity';
import { AbstractModel } from 'src/shared/models/abstract.model';

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class Student extends AbstractModel {
  lastname: string;
  firstname: string;
  status: StudentStatus;
  email: string;
  password: string;
  userId: string;
  idNumber: string;
  parents: ParentEntity[];
}
