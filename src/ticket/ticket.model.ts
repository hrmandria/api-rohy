import { AbstractModel } from 'src/shared/models/abstract.model';

export enum TicketType {
  ENTRANCE = 'ENTRANCE',
  EXIT = 'EXIT',
  ABSENCE = 'ABSENCE',
  CONVOCATION = 'CONVOCATION',
  WARNING = 'WARNING',
  PENALIZATION = 'PENALIZATION',
  CORRESPONDENCE = 'CORRESPONDENCE',
}

export class Ticket extends AbstractModel {
  from: Date;
  to: Date;
  cause: string;
  reason: string;
  decision: string;
  anouncement: string;
  pointsNumber: number;
  managerSignature: boolean;
  parentSignature: boolean;
  type: TicketType;
  managerId: string;
  parentId: string;
  userId: string;
}
