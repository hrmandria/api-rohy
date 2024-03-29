import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleAuthenticationService } from './google-authentication.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { configService } from 'src/shared/config/config.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configService.getJwtConfig().secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    GoogleAuthenticationService,
    JwtStrategy,
    UserModule,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
