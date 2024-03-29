import { Body, Controller, Post } from '@nestjs/common';
import { GoogleCredential, UserCredential } from 'src/user/user.model';
import { AuthenticationService } from './authentication.service';
import { GoogleAuthenticationService } from './google-authentication.service';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post('login')
  async login(@Body() request: UserCredential) {
    return this.authenticationService.login(request);
  }

  @Post('google-login')
  async googleLogin(@Body() request: GoogleCredential) {
    return this.googleAuthenticationService.login(request.accessToken);
  }
}
