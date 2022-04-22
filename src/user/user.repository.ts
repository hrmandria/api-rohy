import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  private readonly users: User[] = [
    {
      id: '7e6373e6-5d90-47f4-9f3c-f23fc739bc00',
      idNumber: 'swiftose',
      password: '$2a$12$VgDZb7hYM2TC20Zu4c5zjetNBbDYCLW8l6cw1HMWAFUGq5vmx5Tru',
    },
  ];

  async findOneByIDNumber(username: string): Promise<User | undefined> {
    const result = this.users.find((user) => user.idNumber === username);
    return result;
  }
}
