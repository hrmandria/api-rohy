import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { TicketController } from './ticket.controller';
import { TicketEntity } from './ticket.entity';
import { TicketRepository } from './ticket.repository';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity, StudentEntity])],
  controllers: [TicketController],
  providers: [TicketRepository, TicketService, StudentRepository],
})
export class TicketModule {}
