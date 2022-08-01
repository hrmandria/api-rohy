import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from 'src/grade/grade.entity';
import { GradeRepository } from 'src/grade/grade.repository';
import { GradeService } from 'src/grade/grade.service';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { TeacherService } from 'src/teacher/teacher.service';
import { UserEntity } from 'src/user/user.entity';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity, TeacherEntity, GradeEntity])],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, GradeRepository, TeacherService, TeacherRepository, GradeService],
})
export class SubjectModule { }
