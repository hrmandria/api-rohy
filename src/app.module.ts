import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config/config.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    SharedModule,
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    StudentModule,
  ],
})
export class AppModule {}
