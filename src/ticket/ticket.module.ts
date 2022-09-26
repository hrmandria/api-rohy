import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileEntity } from 'src/files/file.entity';
import { DatabaseFileModule } from 'src/files/file.module';
import { DatabaseFileRepository } from 'src/files/file.repository';
import { DatabaseFileService } from 'src/files/file.service';
import { ParentModule } from 'src/parent/parent.module';
import { ParentRepository } from 'src/parent/parent.repository';
import { ParentService } from 'src/parent/parent.service';
import { ConfigService } from "@nestjs/config";
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TicketController } from './ticket.controller';
import { TicketEntity } from './ticket.entity';
import { TicketRepository } from './ticket.repository';
import { TicketService } from './ticket.service';
import { JwtModule } from '@nestjs/jwt';
import { ParentEntity } from 'src/parent/parent.entity';
import { StudentService } from 'src/student/student.service';
import SmsService from 'src/sms/sms.service';
import { Twilio } from 'twilio';
import { SmsModule } from 'src/sms/sms.module';
import { configService } from 'src/shared/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      StudentEntity,
      DatabaseFileEntity,
      UserEntity,
      ParentEntity
    ]),
    JwtModule.register({
      secret: configService.getJwtConfig().secret,
      signOptions: { expiresIn: '3600s' },
    }), ParentModule, DatabaseFileModule, UserModule, Twilio, SmsModule],
  controllers: [TicketController],
  providers: [TicketRepository, SmsService, Twilio, TicketService, ConfigService, ParentService, StudentRepository, DatabaseFileService, StudentService, DatabaseFileRepository, UserService, UserRepository, ParentRepository],
})
export class TicketModule { }
