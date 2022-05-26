import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }

  @Delete(':id')
  async deleteUser(@Query() id: string) {
    return this.userService.deleteUser(id);
  }
}
