import { Body, Controller, Delete, Post, Query } from "@nestjs/common";
import { CreateCourseDto } from "./course.dto";
import { CourseService } from "./course.service";

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    async createCourse(@Body() dto: CreateCourseDto) {
        return await this.courseService.createCourse(dto);
    }

    @Delete()
    async deleteCourse(@Query() id: any) {
        return await this.courseService.deleteCourse(id);
    }
}