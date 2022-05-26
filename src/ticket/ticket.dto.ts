import { TicketType } from './ticket.model';

export interface CreateTicketDto {
  from: Date;
  to: Date;
  cause: string;
  reason: string;
  decision: string;
  pointsNumber: number;
  managerSignature: boolean;
  parentSignature: boolean;
  type: TicketType;
  managerId: string;
  parentId: string;
  userId: string;
}
