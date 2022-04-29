import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async listPaginatedStudent(@Query() query: PaginationCriteria) {
    return this.studentService.listPaginatedStudent(query);
  }

  @Post()
  async createStudent() {
    // TODO save one student
  }
}
