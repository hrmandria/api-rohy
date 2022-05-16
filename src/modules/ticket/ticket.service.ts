import { Injectable } from "@nestjs/common";
import { Ticket } from "./ticket.model";

@Injectable()
export class TicketService {
    constructor(private readonly ticketRepository) { }

    async createTicket(ticketCredential: Ticket): Promise<Ticket> {
        const ticket = new Ticket();
        ticket.from = ticketCredential.from;
        ticket.to = ticketCredential.to;
        ticket.cause = ticketCredential.cause;
        ticket.decision = ticketCredential.decision;
        ticket.pointsNumber = ticketCredential.pointsNumber;
        ticket.managerSignature = ticketCredential.managerSignature;
        ticket.parentSignature = ticketCredential.parentSignature;
        ticket.managerId = ticketCredential.managerId;
        ticket.parentId = ticketCredential.parentId;
        ticket.type = ticketCredential.type;

        return this.ticketRepository.save(ticket);
    }
}