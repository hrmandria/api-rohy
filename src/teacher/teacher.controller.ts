import { Body, Controller, Post } from "@nestjs/common";

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post()
    async createTeacher(@Body() dto: CreateTeacherDto) {
        return this.teacherService.createTeacher(dto);
    }
}