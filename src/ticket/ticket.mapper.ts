import { TicketEntity } from './ticket.entity';
import { Ticket } from './ticket.model';

export class TicketMapper {
  public static fromEntity(source: TicketEntity): Ticket {
    const ticket = new Ticket();
    ticket.from = source.from;
    ticket.to = source.to;
    ticket.reason = source.reason;
    ticket.decision = source.decision;
    ticket.pointsNumber = source.pointsNumber;
    ticket.managerSignature = source.managerSignature;
    ticket.parentSignature = source.parentSignature;
    ticket.managerId = source.managerId;
    ticket.parentId = source.parentId;
    ticket.type = source.type;
    return ticket;
  }

  public static toEntity(source: Ticket): TicketEntity {
    const ticketEntity = new TicketEntity();
    ticketEntity.from = source.from;
    ticketEntity.to = source.to;
    ticketEntity.reason = source.reason;
    ticketEntity.decision = source.decision;
    ticketEntity.pointsNumber = source.pointsNumber;
    ticketEntity.managerSignature = source.managerSignature;
    ticketEntity.parentSignature = source.parentSignature;
    ticketEntity.managerId = source.managerId;
    ticketEntity.parentId = source.parentId;
    ticketEntity.type = source.type;
    return ticketEntity;
  }
}
