import { Body, Controller, Post } from "@nestjs/common";
import { CreateGradeDto } from "./grade.dto";

@Controller('parent')
export class GradeController {
    constructor(private readonly gradeService ) {}

    @Post()
    async createGrade(@Body() dto: CreateGradeDto) {
        return this.gradeService.createGrade(dto);
    }
}