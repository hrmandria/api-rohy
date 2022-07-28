import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { JwtService } from '@nestjs/jwt';

export interface FindOptions {
  idNumber?: string;
  email?: string;
}

export interface PayloadType {
  username: string;
  sub: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtTokenService: JwtService,
  ) {}

  async findBy(options: FindOptions): Promise<User | undefined> {
    try {
      const userEntity = await this.userRepository.findOne({ ...options });

      if (!userEntity) {
        return undefined;
      }

      return UserMapper.fromEntity(userEntity);
    } catch (e) {
      throw new Error('Cannot find user');
    }
  }

  async generateIdNumber() {
    let value = '';
    for (let i = 0; i < 6; i++) {
      value += Math.floor(Math.random() * 9);
    }
    const match = await this.findBy({ idNumber: value });
    if (match == undefined) {
      return value;
    } else {
      await this.generateIdNumber();
    }
  }

  async getUser(token: string) {
    try {
      const decodedToken = this.jwtTokenService.decode(token) as PayloadType;
      console.log(decodedToken);
      const options = { idNumber: decodedToken.username };
      let user = {};
      await this.findBy(options).then((result) => {
        user = result;
      });
      return user;
    } catch (e) {
      console.log(e);
      //throw new Error('Cannot get user');
    }
  }

  async listBy(options: FindOptions): Promise<User[]> {
    try {
      const userEntities = await this.userRepository.find({ ...options });

      return userEntities.map(UserMapper.fromEntity);
    } catch (e) {
      throw new Error('Cannot list user');
    }
  }

  async save(user: User) {
    try {
      const userEntity = UserMapper.toEntity(user);
      const savedUserEntity = await this.userRepository.save(userEntity);
      return UserMapper.fromEntity(savedUserEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save user');
    }
  }

  async delete(id: string) {
    try {
      this.userRepository.delete({ id });
    } catch (e) {
      throw new Error('Cannot delete user');
    }
  }
}
