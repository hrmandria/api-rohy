import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config/config.service';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { TicketModule } from './ticket/ticket.module';
import { DatabaseFileModule } from './files/file.module';
import { SmsModule } from './sms/sms.module';
import { AedModule } from './aed/aed.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    StudentModule,
    TicketModule,
    SharedModule,
    ParentModule,
    SmsModule,
    DatabaseFileModule,
    AedModule,
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
  ],
})
export class AppModule { }
