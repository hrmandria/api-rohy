import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { PaginationCriteria } from '../shared/models/paginated.model';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    return this.ticketService.createTicket(dto);
  }

  @Get()
  async listPaginatedTicket(
    @Query() type: any,
    @Query() query: PaginationCriteria,
  ) {
    return await this.ticketService.listPaginatedTicket(type.type, query);
  }

  @Get('student/type')
  async findByStudent(@Query() id: any, @Query() type: any) {
    return await this.ticketService.findByStudent(id.id, type.type);
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
