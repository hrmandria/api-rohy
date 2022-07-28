import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { PaginationCriteria } from '../shared/models/paginated.model';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    return this.ticketService.createTicket(dto);
  }

  @Get('studentTickets')
  async getTickets(@Query() studentId: any) {
    return await this.ticketService.getTickets(studentId.studentId);
  }

  @Get()
  async listpaginatedTicket(@Query() query: PaginationCriteria) {
    return this.ticketService.listPaginatedTicket(query);
  }

  @Delete()
  async deleteTicket(@Query() id: any) {
    return await this.ticketService.deleteTicket(id.id);
  }

  @Post('confirm')
  async confirm(@Query() parentId: any, @Query() ticketId: any) {
    return await this.ticketService.confirm(
      parentId.parentId,
      ticketId.ticketId,
    );
  }
}
