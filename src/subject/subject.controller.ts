import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubjectDto } from './subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Post()
  async createSubject(@Body() request: CreateSubjectDto) {
    return this.subjectService.createSubject(request);
  }
}
