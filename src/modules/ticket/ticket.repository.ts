import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketMapper } from './ticket.mapper';
import { Ticket } from './ticket.model';
import { v4 as uuidv4 } from 'uuid';

export interface FindOptions {
  idNumber?: string;
  from?: Date;
}

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) { }

  async save(ticket: Ticket): Promise<Ticket> {
    try {
      ticket.idNumber = uuidv4();
      const ticketEntity = TicketMapper.toEntity(ticket);
      const savedTicketEntity = await this.ticketRepository.save(ticketEntity);
      return TicketMapper.fromEntity(savedTicketEntity);
    } catch (e) {
      throw new Error('Cannot save ticket');
    }
  }

  async createTicket(ticketCredential: Ticket) {
    try {
      this.ticketRepository.save(ticketCredential);
      return this.ticketRepository;
    } catch {
      throw new console.error('Cannot create ticket');
    }
  }

  async findBy(options: FindOptions): Promise<Ticket | undefined> {
    const ticketEntity = await this.ticketRepository.findOne({ ...options });

    if (!ticketEntity) {
      return undefined;
    }

    return TicketMapper.fromEntity(ticketEntity);
  }
}
