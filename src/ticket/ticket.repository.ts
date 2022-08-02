import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Paginated,
  PaginationCriteria,
} from 'src/shared/models/paginated.model';
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
  ) { }

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
      throw new Error('Cannot list paginated ticket');
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

  async findByType(typeName: string) {
    return await this.ticketRepository.findAndCount({
      where: { type: typeName }
    })
  }

  async findByStudent(id: string, type: string) {
    try {
      return await this.ticketRepository.findAndCount({
        where: {
          studentId: id,
          type: type
        }
      })
    } catch (e) {
      console.log(e);
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

  async deleteTicket(id: string) {
    await this.ticketRepository.delete(id);
  }

  async confirmTicket(parentId: string, options: FindOptions) {
    const ticket = await this.findBy(options);
    ticket.parentId = parentId;
    ticket.parentSignature = true;
    const savedTicket = await this.ticketRepository.save(ticket);
    return TicketMapper.fromEntity(savedTicket);
  }
}
