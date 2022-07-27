import { Injectable } from '@nestjs/common';
import { FindOptions, StudentRepository } from 'src/student/student.repository';
import { CreateTicketDto } from './ticket.dto';
import { Ticket } from './ticket.model';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly studentRepository: StudentRepository) { }

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
    const options: FindOptions = {
      id: ticket.studentId,
      email: ""
    }
    this.studentRepository.findBy(options);
    return this.ticketRepository.save(ticket);
  }
}
