import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { User, UserCredential } from "./user.model";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { has } from "lodash";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(userCred: CreateUserDto) {
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(userCred.password, salt);
        userCred.password = hashedPassword;
        this.userRepository.save(userCred);
    }

    async deleteUser(idNumber: string) {
        return await this.userRepository.delete(idNumber);
    }
}