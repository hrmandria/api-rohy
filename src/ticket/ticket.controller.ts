import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { PaginationCriteria } from 'src/shared/models/paginated.model';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    return this.ticketService.createTicket(dto);
  }

  @Get()
  async listPaginatedTicket(@Query() query: PaginationCriteria) {
    return this.ticketService.listPaginatedTicket(query);
  }
}
