import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { CourseRepository } from 'src/course/course.repository';
import { GradeEntity } from 'src/grade/grade.entity';
import { GradeRepository } from 'src/grade/grade.repository';
import { TimetableController } from './timetable.controller';
import { TimetableEntity } from './timetable.entity';
import { TimetableRepository } from './timetable.repository';
import { TimetableService } from './timetable.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimetableEntity, CourseEntity, GradeEntity])],
  controllers: [TimetableController],
  providers: [TimetableRepository, TimetableService, CourseRepository, GradeRepository],
})
export class TimetableModule { }
