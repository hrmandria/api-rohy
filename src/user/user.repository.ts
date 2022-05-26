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
        return undefined;
      }

      return UserMapper.fromEntity(userEntity);
    } catch (e) {
      throw new Error('Cannot find user');
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
