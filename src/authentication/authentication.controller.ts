import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCredential } from 'src/user/user.model';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() request: UserCredential) {
    return this.authenticationService.login(request);
  }
}
