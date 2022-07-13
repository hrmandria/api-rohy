import { NoteEntity } from "./note.entity";
import { Note } from "./note.model";

export class NoteMapper {
    public static fromEntity(source: NoteEntity): Note {
        const note = new Note(source.id);
        note.studentId = source.studentId;
        note.subjectId = source.subjectId;
        note.value = source.value;
        note.teacherId = source.teacherId;

        return note;
    }

    public static toEntity(source: Note): NoteEntity {
        const noteEntity = new NoteEntity();
        noteEntity.studentId = source.studentId;
        noteEntity.subjectId = source.subjectId;
        noteEntity.value = source.value;
        noteEntity.teacherId = source.teacherId;
        
        return noteEntity;
    }
}