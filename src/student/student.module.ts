import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserService } from 'src/user/user.service';
import { StudentController } from './student.controller';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, TicketEntity])],
  controllers: [StudentController],
  providers: [StudentRepository, StudentService, UserService],
})
export class StudentModule {}
