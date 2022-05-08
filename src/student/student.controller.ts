import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { CreateStudentDto } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() request: CreateStudentDto) {
    return this.studentService.createStudent(request);
  }

  @Get()
  async listPaginatedStudent(@Query() query: PaginationCriteria) {
    return this.studentService.listPaginatedStudent(query);
  }

  @Get(':id')
  async getStudent(@Param('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
