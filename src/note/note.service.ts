import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './note.dto';
import { Note } from './note.model';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository) { }

  async createNote(dto: CreateNoteDto) {
    const note = new Note();
    note.student = dto.studentId;
    note.subject = dto.subjectId;
    note.value = dto.value;
    note.teacher = dto.teacherId

    return this.noteRepository.save(note);
  }

  async getNotesByStudent(studentId: string) {
    return await this.noteRepository.findNotesByStudent(studentId);
  }
}
