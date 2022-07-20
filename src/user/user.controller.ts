import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { AuthenticationToken } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }

  @Get('getUser')
  async getUser(@Body() request: AuthenticationToken) {
    return this.userService.getUser(request)
  }

  @Delete(':id')
  async deleteUser(@Query() id: string) {
    return this.userService.deleteUser(id);
  }
}
