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
  managerId: string;
  parentId: string;
  studentId: string;
}
