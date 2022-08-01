import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGradeDto } from './grade.dto';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) { }

    @Post()
    async createGrade(@Body() dto: CreateGradeDto) {
        return this.gradeService.createGrade(dto);
    }

    @Get()
    async findGrade(@Query() name: any) {
        return await this.gradeService.findGrade(name.name);
    }

    @Get('students')
    async findStudents(@Query() name: any) {
        return await this.gradeService.getStudents(name.name);
    }

    @Get('subjects')
    async findSubjects(@Query() name: any) {
        return await this.gradeService.getSubjects(name.name);
    }
}
