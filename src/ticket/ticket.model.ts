import { AbstractModel } from 'src/shared/models/abstract.model';

export enum TicketType {
  ENTRANCE = 'RETARD',
  EXIT = 'SORTIE',
  ABSENCE = 'ABSENCE',
  CONVOCATION = 'CONVOCATION',
  WARNING = 'AVERTISSEMENT',
  PENALIZATION = 'PENALISATION',
  CORRESPONDENCE = 'DIVERS',
}

export class Ticket extends AbstractModel {
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
