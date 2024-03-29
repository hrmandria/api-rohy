import { TicketEntity } from './ticket.entity';
import { Ticket } from './ticket.model';

export class TicketMapper {
  public static fromEntity(source: TicketEntity): Ticket {
    const ticket = new Ticket(source.id);
    ticket.from = source.from;
    ticket.to = source.to;
    ticket.reason = source.reason;
    ticket.decision = source.decision;
    ticket.text = source.text;
    ticket.pointsNumber = source.pointsNumber;
    ticket.managerSignature = source.managerSignature;
    ticket.parentSignature = source.parentSignature;
    ticket.managerId = source.managerId;
    ticket.parentId = source.parentId;
    ticket.type = source.type;
    ticket.studentId = source.studentId;
    return ticket;
  }

  public static toEntity(source: Ticket): TicketEntity {
    const ticketEntity = new TicketEntity();
    ticketEntity.from = source.from;
    ticketEntity.to = source.to;
    ticketEntity.reason = source.reason;
    ticketEntity.decision = source.decision;
    ticketEntity.text = source.text;
    ticketEntity.pointsNumber = source.pointsNumber;
    ticketEntity.managerSignature = source.managerSignature;
    ticketEntity.parentSignature = source.parentSignature;
    ticketEntity.managerId = source.managerId;
    ticketEntity.parentId = source.parentId;
    ticketEntity.type = source.type;
    ticketEntity.studentId = source.studentId;
    return ticketEntity;
  }
}
