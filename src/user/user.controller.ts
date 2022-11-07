import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
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
  
  @Get('findUser')
  async findUser(@Query() id: any) {
    return this.userService.findUser(id.id);
  }
  @Delete(':id')
  async deleteUser(@Query() id: string) {
    return this.userService.deleteUser(id);
  }
}
