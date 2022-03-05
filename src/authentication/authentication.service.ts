import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private usersService: UsersService, private jwtTokenService: JwtService){};

    async validateUser(username: string, pass: string): Promise <any> {
        const user = await this.usersService.findOne(username);
        const salt = await bcrypt.genSalt();
        const hashedPassword = bcrypt.hash(user.password, salt);
        if (user && hashedPassword === bcrypt.hash(pass,salt)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: this.jwtTokenService.sign(payload)
        }
    }
}
