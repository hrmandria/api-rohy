import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketMapper } from './ticket.mapper';
import { Ticket } from './ticket.model';

export interface FindOptions {
  id?: string;
  from?: Date;
}

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async save(ticket: Ticket): Promise<Ticket> {
    try {
      const ticketEntity = TicketMapper.toEntity(ticket);
      const savedTicketEntity = await this.ticketRepository.save(ticketEntity);
      return TicketMapper.fromEntity(savedTicketEntity);
    } catch (e) {
      throw new Error('Cannot save ticket');
    }
  }

  async findBy(options: FindOptions): Promise<Ticket | undefined> {
    try {
      const ticketEntity = await this.ticketRepository.findOne({ ...options });

      if (!ticketEntity) {
        return undefined;
      }

      return TicketMapper.fromEntity(ticketEntity);
    } catch (e) {
      throw new Error('Cannot find ticket');
    }
  }
}
