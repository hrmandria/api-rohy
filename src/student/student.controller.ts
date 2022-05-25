import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateStudentDto, DeleteStudentDto } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get()
  async listPaginatedStudent(@Query() query: PaginationCriteria) {
    return this.studentService.listPaginatedStudent(query);
  }

  @Post('createStudent')
  async createStudent(@Body() request: CreateStudentDto) {
    return this.studentService.createStudent(request);
  }

  @Post('deleteStudent')
  async deleteStudent(@Body() request: DeleteStudentDto) {
    return this.studentService.deleteUser(request.firstname, request.lastname);
  }
}
