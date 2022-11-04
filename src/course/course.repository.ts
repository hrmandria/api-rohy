import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseEntity } from "./course.entity";
import { CourseMapper } from "./course.mapper";
import { Course } from "./course.model";

export interface FindOptions {
    id?: string;
    subjectName?: string;
}

@Injectable()
export class CourseRepository {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) { }

    async save(course: Course): Promise<Course> {
        try {
            const courseEntity = CourseMapper.toEntity(course);
            const savedCourseEntity = await this.courseRepository.save(courseEntity);
            return CourseMapper.fromEntity(savedCourseEntity);
        } catch (e) {
            console.log(e);
            throw new Error('Cannot save course');
        }
    }

    async findBy(options: FindOptions): Promise<Course | undefined> {
        try {
            const courseEntity = await this.courseRepository.findOne({ ...options });

            if (!courseEntity) {
                return undefined;
            }

            return CourseMapper.fromEntity(courseEntity);
        } catch (e) {
            throw new Error('Cannot find course');
        }
    }

    async delete(id: string) {
        return await this.courseRepository.delete(id);
    }
}