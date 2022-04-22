import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserData } from "src/user/user.model";
import { UserRepository } from "src/user/user.repository";
import { RegistrationService } from "./registration.service";

@Controller()
export class RegistrationController {
    constructor(
        private registrationService: RegistrationService,
        private userRepo: UserRepository
    ) {}

    @Post('register')
    async register(@Body() request:UserData) {
        this.registrationService.register(request);
        return this.userRepo;
    }
}