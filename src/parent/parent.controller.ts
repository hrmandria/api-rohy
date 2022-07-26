import { Body, Controller, Delete, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  @Delete(':id')
  async deleteParent(@Param('id') id: string) {
    return this.parentService.deleteParent(id);
  }
}
