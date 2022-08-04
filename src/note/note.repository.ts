import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from './note.entity';
import { NoteMapper } from './note.mapper';
import { Note } from './note.model';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) { }

  async save(note: Note): Promise<Note> {
    try {
      const noteEntity = NoteMapper.toEntity(note);
      const savedNoteEntity = await this.noteRepository.save(noteEntity);
      return NoteMapper.fromEntity(savedNoteEntity);
    } catch (e) {
      console.log(e);
      throw new Error('Cannot save note');
    }
  }

  async findNotesByStudent(studentId: string) {
    const notes = await this.noteRepository.findAndCount({
      relations: ["studentEntity", "subjectEntity", "teacherEntity"],
    })
    let studentsNotes: NoteEntity[] = []
    notes[0].forEach(noteEntity => {
      if (noteEntity.student == studentId) {
        studentsNotes.push(noteEntity);
      }
    })
    return studentsNotes;
  }
}
