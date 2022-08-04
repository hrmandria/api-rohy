import { Injectable } from '@nestjs/common';
import { time } from 'console';
import { CourseEntity } from 'src/course/course.entity';
import { CourseMapper } from 'src/course/course.mapper';
import { CourseRepository } from 'src/course/course.repository';
import { GradeMapper } from 'src/grade/grade.mapper';
import { GradeRepository } from 'src/grade/grade.repository';
import { CreateTimetableDto } from './timetable.dto';
import { Timetable } from './timetable.model';
import { FindOptions, TimetableRepository } from './timetable.repository';

@Injectable()
export class TimetableService {
  constructor(
    private readonly timetableRepository: TimetableRepository,
    private readonly courseRepository: CourseRepository,
    private readonly gradeRepository: GradeRepository
  ) { }

  async createTimetable(dto: CreateTimetableDto) {
    const timetable = new Timetable();
    timetable.gradeName = dto.gradeName;
    timetable.grade = GradeMapper.toEntity(await this.gradeRepository.findBy({ name: dto.gradeName }));
    const courseNames = dto.courseNames;
    let validCourses: CourseEntity[] = []
    courseNames.forEach(async element => {
      const temp = CourseMapper.toEntity(await this.courseRepository.findBy({ subjectName: element }));
      if (temp.gradeName == timetable.gradeName) {
        validCourses.push(temp);
      }
    })
    timetable.courses = validCourses;

    return await this.timetableRepository.save(timetable)
  }

  async findTimetable(gradeName: string) {
    const options = { gradeName }
    return await this.timetableRepository.findBy(options);
  }

  async deleteTimetable(id: string) {
    return await this.timetableRepository.deleteTimetable(id);
  }
}
