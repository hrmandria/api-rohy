import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/user.dto";
import { UserMapper } from "src/user/user.mapper";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { CreateAedDto } from "./aed.dto";
import { Aed, Status } from "./aed.model";
import { AedRepository } from "./aed.repository";

@Injectable()
export class AedService {
    constructor(
        private readonly aedRepository: AedRepository,
        private readonly userRepository: UserRepository,
        private readonly userService: UserService
    ) { }

    async createAed(dto: CreateAedDto) {
        const aed = new Aed();
        aed.name = dto.name;
        aed.email = dto.email;
        aed.status = Status.ACTIVE;
        const idNumber = await this.userService.generateIdNumber();
        aed.idNumber = idNumber;
        const createUserDto: CreateUserDto = {
            idNumber: idNumber,
            email: dto.email,
            password: dto.password,
        };
        const user = UserMapper.toEntity(
            await this.userService.createUser(createUserDto),
        );
        aed.userId = user.id;
        aed.user = user;
        return await this.aedRepository.save(aed);
    }

    async findAll() {
        return await this.aedRepository.findAll();
    }

    async findBy(id: string) {
        return await this.aedRepository.findBy(id);
    }

    async getAedByIdNumber(idNumber: string) {
        return await this.aedRepository.getAedByIdNumber(idNumber);
    }

    async deleteAed(id: string) {
        return await this.aedRepository.delete(id);
    }
}