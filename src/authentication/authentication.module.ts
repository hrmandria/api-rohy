import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions: {expiresIn: '3600s'}
    })],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}