<<<<<<< HEAD
import { DatabaseFileEntity } from "src/files/file.entity";
import { AbstractModel } from "src/shared/models/abstract.model";
import { StudentEntity } from "src/student/student.entity";
=======
import { AbstractModel } from 'src/shared/models/abstract.model';
import { StudentEntity } from 'src/student/student.entity';
>>>>>>> a83093cc848116165534dc252b2580efb11f2276

export enum ParentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ParentGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export class Parent extends AbstractModel {
  lastname: string;
  firstname: string;
  status: ParentStatus;
  userId: string;
  students: StudentEntity[];
}
