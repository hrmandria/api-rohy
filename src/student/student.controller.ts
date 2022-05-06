import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateStudentDto } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get()
  async listPaginatedStudent(@Query() query: PaginationCriteria) {
    return this.studentService.listPaginatedStudent(query);
  }

  @Post('create')
  async createStudent(@Body() request: CreateStudentDto) {
    return this.studentService.createStudent(request);
  }

  @Post('delete')
  async deleteStudent(@Body() request: CreateStudentDto) {
    return this.studentService.deleteStudent(request.userId);
  }
}
