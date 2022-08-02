import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { StudentService } from 'src/student/student.service';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { SubjectService } from 'src/subject/subject.service';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { GradeController } from './grade.controller';
import { GradeEntity } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GradeEntity, TeacherEntity, StudentEntity, SubjectEntity])
  ],
  controllers: [GradeController],
  providers: [GradeRepository, GradeService, StudentService, SubjectService, TeacherRepository, StudentRepository, SubjectRepository],
})
export class GradeModule { }
