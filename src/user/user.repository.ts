import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';

export interface FindOptions {
  idNumber?: string;
  email?: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findBy(options: FindOptions): Promise<User | undefined> {
    try {
      const userEntity = await this.userRepository.findOne({ ...options });

      if (!userEntity) {
        throw new Error(`Cannot find user with options ${options}`);
      }

      return UserMapper.fromEntity(userEntity);
    } catch (e) {
      new Error(`Cannot find user ${e.message}`);
    }
  }

  async listBy(options: FindOptions): Promise<User[]> {
    try {
      const userEntities = await this.userRepository.find({ ...options });

      return userEntities.map(UserMapper.fromEntity);
    } catch (e) {
      throw new Error(`Cannot list user ${e.message}`);
    }
  }
}
