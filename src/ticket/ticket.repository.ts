import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketMapper } from './ticket.mapper';
import { Ticket } from './ticket.model';
import { TicketType } from './ticket.model';
import {
  Paginated,
  PaginationCriteria,
} from 'src/shared/models/paginated.model';

export interface FindOptions {
  type?: TicketType;
}

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async listPaginatedTicket(
    criteria: PaginationCriteria,
  ): Promise<Paginated<Ticket>> {
    try {
      const { page, pageSize } = criteria;
      const [entities, total] = await this.ticketRepository.findAndCount({
        order: {
          createdAt: 'DESC',
          id: 'ASC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        items: entities.map(TicketMapper.fromEntity),
        total,
      };
    } catch (e) {
      throw new Error('Cannot list paginated Ticket');
    }
  }

  async save(ticket: Ticket): Promise<Ticket> {
    try {
      const ticketEntity = TicketMapper.toEntity(ticket);
      const savedTicketEntity = await this.ticketRepository.save(ticketEntity);
      return TicketMapper.fromEntity(savedTicketEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save ticket');
    }
  }
}
