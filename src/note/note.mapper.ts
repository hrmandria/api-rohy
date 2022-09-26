import { NoteEntity } from './note.entity';
import { Note } from './note.model';

export class NoteMapper {
  public static fromEntity(source: NoteEntity): Note {
    const note = new Note(source.id);
    note.student = source.student;
    note.subject = source.subject;
    note.value = source.value;
    note.teacher = source.teacher;
    note.semester = source.semester;
    note.coefficient = source.coefficient;
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
    noteEntity.semester = source.semester;
    noteEntity.coefficient = source.coefficient;
    noteEntity.studentEntity = source.studentEntity;
    noteEntity.subjectEntity = source.subjectEntity;
    noteEntity.teacherEntity = source.teacherEntity;
    return noteEntity;
  }
}
