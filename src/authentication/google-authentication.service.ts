import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';
import { configService } from 'src/shared/config/config.service';
import { CannotFindTokenUserException } from 'src/user/user.exception';
import { UserRepository } from 'src/user/user.repository';
import { AuthenticationResponse } from './authentication.model';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtService,
  ) {
    const clientID = configService.getGoogleClientConfig().clientID;
    const clientSecret = configService.getGoogleClientConfig().secret;
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async login(token: string): Promise<AuthenticationResponse> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const user = await this.userRepository.findBy({ email: tokenInfo.email });

    if (!user) {
      throw new CannotFindTokenUserException(token);
    }

    const { id, email, role } = user;
    const payload = { username: email, sub: id };

    return {
      user: {
        role,
        email,
        idNumber: null,
      },
      token: this.jwtTokenService.sign(payload),
    };
  }
}
