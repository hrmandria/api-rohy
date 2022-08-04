import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto) {
    const user = new User();
    user.idNumber = dto.idNumber;
    user.email = dto.email;

    if (dto.password) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(dto.password, salt);
      user.password = hashedPassword;
    }

    return this.userRepository.save(user);
  }

  async getUser(authenticationToken: string) {
    return this.userRepository.getUser(authenticationToken);
  }

  async deleteUser(id: string) {
    this.userRepository.delete(id);
  }

  async generateIdNumber() {
    return await this.userRepository.generateIdNumber();
  }
}
