import { Injectable } from '@nestjs/common';
import { UserData } from './user.model';

@Injectable()
export class UserDataRepository {
  private readonly data: UserData[] = [
    {
      id: '7e6373e6-5d90-47f4-9f3c-f23fc739bc00',
      firstname: 'swiftose',
      lastname: 'swiftose',
      idNumber: 'swiftose',
      password: '$2a$12$VgDZb7hYM2TC20Zu4c5zjetNBbDYCLW8l6cw1HMWAFUGq5vmx5Tru',
    },
  ];
  async createUser(id: string, firstname: string, lastname: string, idNumber: string, password: string){
    const newUser = {id, idNumber, firstname, lastname, password};
    this.data.push(newUser);
  }
}