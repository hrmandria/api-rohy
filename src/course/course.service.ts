import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./course.dto";
import { Course } from "./course.model";
import { CourseRepository } from "./course.repository";
import { SubjectRepository } from "../subject/subject.repository"
import { GradeRepository } from "src/grade/grade.repository";
import { TeacherRepository } from "src/teacher/teacher.repository";

@Injectable()
export class CourseService {
    constructor(
        private readonly courseRepository: CourseRepository,
        private readonly subjectRepository: SubjectRepository,
        private readonly gradeRepository: GradeRepository,
        private readonly teacherRepository: TeacherRepository
    ) { }

    async createCourse(dto: CreateCourseDto) {
        const course = new Course();
        try {
            const findSubject = await this.subjectRepository.findBy({ name: dto.subjectName });
            if (!findSubject) {
                throw new Error('Cannot find subject')
            }
            course.subject = dto.subjectName;
        } catch (e) {
            console.log(e);
        }

        try {
            const findGrade = await this.gradeRepository.findBy({ name: dto.gradeName });
            if (!findGrade) {
                throw new Error('Cannot find grade');
            }
            course.grade = dto.gradeName;
        } catch (e) {
            console.log(e);
        }

        try {
            const findTeacher = await this.teacherRepository.findBy({ lastname: dto.teacherName });
            if (!findTeacher) {
                throw new Error('Cannot find teacher');
            }
            course.teacher = dto.teacherName;
        } catch (e) {
            console.log(e);
        }
        course.day = dto.day;
        course.from = dto.from;
        course.to = dto.to;
        return await this.courseRepository.save(course);
    }

    async deleteCourse(id: string) {
        return await this.courseRepository.delete(id);
    }
}