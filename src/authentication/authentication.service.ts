import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCredential } from 'src/user/user.model';
import {
  CannotFindUserException,
  PasswordMismatchException,
} from 'src/user/user.exception';
import { UserRepository } from 'src/user/user.repository';
import { AuthenticationResponse } from './authentication.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private userRepository: UserRepository,
    private jwtTokenService: JwtService,
  ) {}

  async login(request: UserCredential): Promise<AuthenticationResponse> {
    const { username, password } = request;
    const user = await this.userRepository.findBy({ idNumber: username });

    if (!user) {
      throw new CannotFindUserException(username);
    }

    const match = await this.comparePassword(password, user.password);
    if (!match) {
      throw new PasswordMismatchException();
    }

    const { id, idNumber, role } = user;
    const payload = { username: idNumber, sub: id, role:role };

    return {
      user: {
        role,
        idNumber,
        email: null,
      },
      token: this.jwtTokenService.sign(payload),
    };
  }

  private async comparePassword(
    firstPassword: string,
    secondPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(firstPassword, secondPassword);
  }
}
