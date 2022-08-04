import { SubjectEntity } from 'src/subject/subject.entity';
import { NoteEntity } from './note.entity';
import { Note } from './note.model';

export class NoteMapper {
  public static fromEntity(source: NoteEntity): Note {
    const note = new Note(source.id);
    note.student = source.student;
    note.subject = source.subject;
    note.value = source.value;
    note.teacher = source.teacher;
    note.studentEntity = source.studentEntity;
    note.subjectEntity = source.subjectEntity;
    note.teacherEntity = source.teacherEntity;
    return note;
  }

  public static toEntity(source: Note): NoteEntity {
    const noteEntity = new NoteEntity();
    noteEntity.student = source.student;
    noteEntity.subject = source.subject;
    noteEntity.value = source.value;
    noteEntity.teacher = source.teacher;
    noteEntity.studentEntity = source.studentEntity;
    noteEntity.subjectEntity = source.subjectEntity;
    noteEntity.teacherEntity = source.teacherEntity;
    return noteEntity;
  }
}
