import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserCredential } from 'src/user/user.model';
import {
  CannotFindUserException,
  PasswordMismatchException,
} from 'src/user/user.exception';
import { UserRepository } from 'src/user/user.repository';
import { AuthenticationResponse } from './authentication.model';
import { omit } from 'lodash';

@Injectable()
export class AuthenticationService {
  constructor(
    public userRepository: UserRepository,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByIDNumber(username);
    if (!user) {
      throw new CannotFindUserException(username);
    }
    
    const match = await this.comparePassword(password, user.password);
    if (!match) {
      throw new PasswordMismatchException();
    }
    return user;
  }

  async login(request: UserCredential): Promise<AuthenticationResponse> {
    const { username } = request;
    const user = await this.userRepository.findOneByIDNumber(username);
    
    if (!user) {
      throw new CannotFindUserException(username);
    }

    const { id, idNumber: identificationNumber } = user;
    const payload = { username: identificationNumber, sub: id };

    return {
      user: omit(user, ['password']),
      token: this.jwtTokenService.sign(payload),
    };
  }

  private async comparePassword(firstPassword: string, secondPassword: string) {
    const match = await bcrypt.compare(firstPassword, secondPassword);
    return match;
  }
  
}
