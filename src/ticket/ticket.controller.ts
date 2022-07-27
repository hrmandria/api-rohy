import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateTicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    return this.ticketService.createTicket(dto);
  }

  @Delete()
  async deleteTicket(@Query() id: any) {
    return await this.ticketService.deleteTicket(id.id);
  }

  @Post('confirm')
  async confirm(@Query() parentId: any, @Query() ticketId: any) {
    return await this.ticketService.confirm(parentId.parentId, ticketId.ticketId);
  }
}
