import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId:1,
            username:"swiftose",
            password:"hide1" 
        },
        {
            userID:2,
            username:"miandry",
            password:"hide22"
        }
    ]

    async findOne(username: string): Promise <User| undefined> {
        return this.users.find(user => user.username === username);
    }
}
