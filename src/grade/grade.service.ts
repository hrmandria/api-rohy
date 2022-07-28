import { Injectable } from '@nestjs/common';
import { Note } from 'src/note/note.model';
import { NoteRepository } from 'src/note/note.repository';
import { CreateGradeDto } from './grade.dto';
import { Grade } from './grade.model';
import { GradeRepository } from './grade.repository';

@Injectable()
export class NoteService {
  constructor(private readonly gradeRepository: GradeRepository) {}

  async createGrade(dto: CreateGradeDto) {
    const grade = new Grade();
    grade.name = dto.name;
    grade.students = dto.students;
    grade.subjects = dto.subjects;

    return this.gradeRepository.save(grade);
  }
}
