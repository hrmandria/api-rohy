import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.model';
import { FindOptions, TicketRepository } from './ticket.repository';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { InvalidPaginationInputException } from '../student/student.exception';

const maxPageSize = 250;

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) { }

  async listPaginatedTicket(criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }
    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }

    return this.ticketRepository.listPaginatedTicket(criteria);
  }

  async getTickets(id: string) {
    return await this.ticketRepository.getTickets(id);
  }

  async findTicket(options: FindOptions) {
    return await this.ticketRepository.findBy(options);
  }

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
    ticket.studentId = dto.studentId;
    return this.ticketRepository.save(ticket);
  }

  async deleteTicket(id: string) {
    return await this.ticketRepository.deleteTicket(id);
  }

  async confirm(parentId: string, ticketId: string) {
    const options: FindOptions = {
      id: ticketId,
    };
    await this.ticketRepository.confirmTicket(parentId, options);
  }
}
