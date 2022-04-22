import { Injectable } from "@nestjs/common";
import { UserData } from "src/user/user.model";
import { UserRepository } from "src/user/user.repository";
import { v4 as uuidv4 } from 'uuid';
import { UserDataRepository } from "src/user/user.data";

@Injectable() 
export class RegistrationService {
    constructor(
        public userRepo: UserRepository,
        public userDataRepo: UserDataRepository
    ) {}
    createId(): string{
        const id = uuidv4();
        return id;
    }
    createUser(firstname: string, lastname: string, idNumber: string, password: string): UserRepository{
        const id = this.createId();
        this.userRepo.createUser(id, idNumber, password);
        this.userDataRepo.createUser(id, firstname, lastname, idNumber, password);
        return this.userRepo;
    } 
    async register(userData: UserData): Promise<string>{
        this.createUser(userData.firstname, userData.lastname, userData.idNumber, userData.password);
        return 'Registration Success';
    }
}
