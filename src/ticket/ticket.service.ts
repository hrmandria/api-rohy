import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.model';
import { FindOptions, TicketRepository } from './ticket.repository';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { InvalidPaginationInputException } from '../student/student.exception';
import { TicketMapper } from './ticket.mapper';

const maxPageSize = 250;

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

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

  async findBy(options: FindOptions): Promise<Ticket | undefined> {
    try {
      const student = await this.ticketRepository.find({ ...optio });
      if (!student) {
        return undefined;
      }
      const map = TicketMapper.fromEntity(student[0]);
      return map;
    } catch (e) {
      throw new Error('Cannot find student');
    }
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
}