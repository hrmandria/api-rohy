import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './note.dto';
import { Note } from './note.model';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(dto: CreateNoteDto) {
    const note = new Note();
    note.studentId = dto.studentId;
    note.subjectId = dto.subjectId;
    note.value = dto.value;
    note.teacherId = dto.teacherId;

    return this.noteRepository.save(note);
  }
}
