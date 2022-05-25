import { Body, Controller, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('createUser')
    async createUser(@Body() request: CreateUserDto) {
        return this.userService.createUser(request);
    }

    @Post('deleteUser')
    async deleteUser(@Query() idNumber: string) {
        return this.userService.deleteUser(idNumber);
    }
}