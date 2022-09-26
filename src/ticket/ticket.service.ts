import { Injectable } from '@nestjs/common';
import { ParentService } from 'src/parent/parent.service';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import SmsService from 'src/sms/sms.service';
import { InvalidPaginationInputException } from 'src/student/student.exception';
import { FindOptions } from 'src/student/student.repository';
import { CreateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.model';
import { TicketRepository } from './ticket.repository';

const maxPageSize = 250;

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) { }

  async createTicket(dto: CreateTicketDto) {
    const ticket = new Ticket();
    ticket.from = dto.from;
    ticket.to = dto.to;
    ticket.reason = dto.reason;
    ticket.decision = dto.decision;
    ticket.text = dto.text;
    ticket.pointsNumber = dto.pointsNumber;
    ticket.managerSignature = dto.managerSignature;
    ticket.parentSignature = dto.parentSignature;
    ticket.type = dto.type;
    ticket.managerId = dto.managerId;
    ticket.parentId = dto.parentId;
    ticket.studentId = dto.studentId;
    await this.ticketRepository.save(ticket);
  }

  async deleteTicket(id: string) {
    return await this.ticketRepository.deleteTicket(id);
  }

  async listPaginatedTicket(type: string, criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }
    return await this.ticketRepository.listPaginatedTicket(criteria, type);
  }

  async findByStudent(id: string, type: string, criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }
    return await this.ticketRepository.findByStudent(id, type, criteria);
  }

  async confirm(parentId: string, ticketId: string) {
    const options: FindOptions = {
      id: ticketId,
    };
    await this.ticketRepository.confirmTicket(parentId, options);
  }
}
