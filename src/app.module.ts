import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/config/config.service';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    SharedModule,
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
  ],
})
export class AppModule {}
