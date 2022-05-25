import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserCredential } from './user.model';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './user.dto';

export interface FindOptions {
  idNumber?: string;
  email?: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findBy(options: FindOptions): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({ ...options });

    if (!userEntity) {
      return undefined;
    }

    return UserMapper.fromEntity(userEntity);
  }

  async listBy(options: FindOptions): Promise<User[]> {
    const userEntities = await this.userRepository.find({ ...options });

    return userEntities.map(UserMapper.fromEntity);
  }

  async save(userDto: CreateUserDto) {
    this.userRepository.save(userDto);
    return this.userRepository;
  }

  async delete(idNumber: string) {
    this.userRepository.delete(idNumber);
  }
}
