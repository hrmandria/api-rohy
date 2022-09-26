import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GradeEntity } from "src/grade/grade.entity";
import { GradeRepository } from "src/grade/grade.repository";
import { SubjectEntity } from "src/subject/subject.entity";
import { SubjectRepository } from "src/subject/subject.repository";
import { TeacherEntity } from "src/teacher/teacher.entity";
import { TeacherRepository } from "src/teacher/teacher.repository";
import { CourseController } from "./course.controller";
import { CourseEntity } from "./course.entity";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, SubjectEntity, GradeEntity, TeacherEntity])],
    controllers: [CourseController],
    providers: [CourseRepository, CourseService, SubjectRepository, GradeRepository, TeacherRepository]
})

export class CourseModule { }