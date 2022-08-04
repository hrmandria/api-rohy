import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('createUser')
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }

  @Get('getUser')
  async getUser(@Query() token: any) {
    const value = token.token;
    return this.userService.getUser(value);
  }

  @Delete(':id')
  async deleteUser(@Query() id: any) {
    return await this.userService.deleteUser(id.id);
  }
}
