import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';

import { rohyModule } from './connexion/rohy/rohy.module';


@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    rohyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
