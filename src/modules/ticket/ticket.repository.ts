import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "src/student/student.entity";
import { Repository } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { TicketMapper } from "./ticket.mapper";
import { Ticket } from "./ticket.model";

@Injectable()
export class TicketRepository {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketRepository: Repository<TicketEntity>,
    ) { }

    async save(ticket: Ticket): Promise<Ticket> {
        try {
            const ticketEntity = TicketMapper.toEntity(ticket);
            const savedTicketEntity = await this.ticketRepository.save(
                ticketEntity,
            );
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
}