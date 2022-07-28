import { Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateParentDto } from './parent.dto';
import { ChangeOptions } from './parent.repository';
import { ParentService } from './parent.service';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) { }

  @Post()
  async createParent(@Body() dto: CreateParentDto) {
    return this.parentService.createParent(dto);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@UploadedFile() file: Express.Multer.File, @Query() userId: any) {
    return await this.parentService.addAvatar(file.buffer, file.originalname, userId.userId);
  }

  @Post('update')
  async modify(@Body() options: ChangeOptions, @Query() id: any) {
    return await this.parentService.modify(options, id.id);
  }

  @Delete(':id')
  async deleteParent(@Param('id') id: string) {
    return this.parentService.deleteParent(id);
  }

  @Get()
  async findChildren(@Query() id: any) {
    return await this.parentService.findChildren(id.id)
  }

  @Post('addChild')
  async addChildren(@Query() parentId: any, @Query() studentId: any) {
    return await this.parentService.addChild(studentId.studentId, parentId.parentId);
  }
}
