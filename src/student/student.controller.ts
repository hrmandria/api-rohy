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
import { FindOptions } from './student.repository';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get()
  async listPaginatedStudent(@Query() query: PaginationCriteria) {
    return this.studentService.listPaginatedStudent(query);
  }

  @Get('findParents')
  async findParents(@Query() studentId: any) {
    return await this.studentService.findParents(studentId.studentId);
  }

  @Post('/find')
  async findStudent(@Body() dto: FindOptions) {
    return await this.studentService.findStudent(dto.id);
  }

  @Post()
  async createStudent(@Body() dto: CreateStudentDto) {
    return this.studentService.createStudent(dto);
  }

  @Get('byIdNumber')
  async getStudentByIdNumber(@Query() idNumber: any) {
    return await this.studentService.getStudentByIdNumber(idNumber.idNumber);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
