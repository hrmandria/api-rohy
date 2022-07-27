import { AbstractModel } from 'src/shared/models/abstract.model';
import { TicketEntity } from 'src/ticket/ticket.entity';

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
}
