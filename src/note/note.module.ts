import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { NoteController } from './note.controller';
import { NoteEntity } from './note.entity';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, StudentEntity])],
  controllers: [NoteController],
  providers: [NoteRepository, NoteService],
})
export class NoteModule { }
