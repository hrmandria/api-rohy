import { Nullable } from 'src/shared/utils/type';
import { TicketType } from './ticket.model';

export interface CreateTicketDto {
  from: Date;
  to: Date;
  reason: string;
  decision: string;
  text: string;
  pointsNumber: number;
  managerSignature: boolean;
  parentSignature: boolean;
  type: TicketType;
  managerId: Nullable<string>;
  parentId: Nullable<string>;
  studentId: string;
}
