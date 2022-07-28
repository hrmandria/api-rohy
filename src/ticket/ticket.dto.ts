import { TicketType } from './ticket.model';

export interface CreateTicketDto {
  from: Date;
  to: Date;
  reason: string;
  decision: string;
  pointsNumber: number;
  managerSignature: boolean;
  parentSignature: boolean;
  type: TicketType;
  managerId: string;
  parentId: string;
  studentId: string;
}

export class TicketFilterDto {
  id: string;
  type: TicketType;
}
