import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.model';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) { }

  async createTicket(dto: CreateTicketDto): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.from = dto.from;
    ticket.to = dto.to;
    ticket.reason = dto.reason;
    ticket.decision = dto.decision;
    ticket.pointsNumber = dto.pointsNumber;
    ticket.managerSignature = dto.managerSignature;
    ticket.parentSignature = dto.parentSignature;
    ticket.type = dto.type;
    ticket.managerId = dto.managerId;
    ticket.parentId = dto.parentId;
    ticket.userId = dto.userId;
    return this.ticketRepository.save(ticket);
  }
}
