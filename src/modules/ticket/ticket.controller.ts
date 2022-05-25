import { Body, Controller, Get } from "@nestjs/common";
import { Ticket } from "./ticket.model";
import { TicketService } from "./ticket.service";

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    async createTicket(@Body() request: Ticket) {
        return this.ticketService.createTicket(request);
    }
}