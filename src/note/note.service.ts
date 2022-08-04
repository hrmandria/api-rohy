import { Injectable } from '@nestjs/common';
import { StudentMapper } from 'src/student/student.mapper';
import { StudentRepository } from 'src/student/student.repository';
import { SubjectMapper } from 'src/subject/subject.mapper';
import { SubjectRepository } from 'src/subject/subject.repository';
import { TeacherMapper } from 'src/teacher/teacher.mapper';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { CreateNoteDto } from './note.dto';
import { Note } from './note.model';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly studentRepository: StudentRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly teacherRepository: TeacherRepository
  ) { }

  async createNote(dto: CreateNoteDto) {
    const note = new Note();
    note.student = dto.studentId;
    note.subject = dto.subjectId;
    note.value = dto.value;
    note.teacher = dto.teacherId;
    note.coefficient = dto.coefficient;
    note.semester = dto.semester;
    note.studentEntity = StudentMapper.toEntity(await this.studentRepository.findBy({ id: dto.studentId }));
    note.subjectEntity = SubjectMapper.toEntity(await this.subjectRepository.findBy({ id: dto.subjectId }));
    note.teacherEntity = TeacherMapper.toEntity(await this.teacherRepository.findBy({ id: dto.teacherId }));
    return this.noteRepository.save(note);
  }

  async getNotesByStudent(studentId: string) {
    return await this.noteRepository.findNotesByStudent(studentId);
  }

  async semesterNotes(studentId: string, semester: string) {
    return await this.noteRepository.findStudentsSemesterNotes(studentId, semester);
  }

  async studentsSemesterAverage(studentId: string, semester: string) {
    return await this.noteRepository.semesterAverage(studentId, semester);
  }
}
