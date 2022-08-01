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
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly parentService: ParentService,
    private readonly smsservice: SmsService) { }

  async createTicket(dto: CreateTicketDto) {
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
    await this.ticketRepository.save(ticket);

    //SEND SMS
    const listOfParents = await this.parentService.findParentsByStudent(ticket.studentId);
    const message = `Nouveau ticket ${ticket.type}`
    console.log(listOfParents)
    if (listOfParents) {
      listOfParents.forEach(parent => {
        this.smsservice.sendMessage(parent.phone, message);
      })
    }
  }

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

  async deleteTicket(id: string) {
    return await this.ticketRepository.deleteTicket(id);
  }

  async findByType(type: string) {
    return await this.ticketRepository.findByType(type);
  }

  async confirm(parentId: string, ticketId: string) {
    const options: FindOptions = {
      id: ticketId,
    };
    await this.ticketRepository.confirmTicket(parentId, options);
  }
}
