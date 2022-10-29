import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateAdminDto } from './admin.dto';
import { ChangeOptions } from './admin.repository';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Get()
  async listPaginatedAdmin(@Query() query: PaginationCriteria) {
    return this.adminService.listPaginatedAdmin(query);
  }

  @Post('findAdmin')
  async findAdmin(@Body() id: any) {
    return await this.adminService.findAdmin(id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query() userId: any,
  ) {
    return await this.adminService.addAvatar(
      file.buffer,
      file.originalname,
      userId.userId,
    );
  }

  @Post('update')
  async modify(@Body() options: ChangeOptions, @Query() id: any) {
    return await this.adminService.modify(options, id.id);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }

  @Get('byIdNumber')
  async getAAdminByIdNumber(@Query() idNumber: any) {
    return await this.adminService.getAdminByIdNumber(idNumber.idNumber);
  }
}
