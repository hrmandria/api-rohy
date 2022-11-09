import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBulletinDto } from './bulletin.dto';
import { BulletinService } from './bulletin.service';

@Controller('bulletin')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) { }

  @Post()
  async createBulletin(@Body() dto: CreateBulletinDto) {
    return await this.bulletinService.createBulletin(dto);
  }

  @Get()
  async findBulletin(@Query() studentId: any) {
    return await this.bulletinService.getBulletinByStudent(studentId.studentId);
  }

  @Get('semester')
  async findStudentsSemesterBulletin(@Query() studentId: any, @Query() semester: any) {
    return await this.bulletinService.semesterBulletin(studentId.studentId, semester.semester);
  }
}
