import { Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async listPaginatedStudent() {
    // TODO return paginated list of all students
  }

  @Post()
  async createStudent() {
    // TODO save one student
  }
}
