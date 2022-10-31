import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateTimetableDto } from "./timetable.dto";
import { TimetableService } from "./timetable.service";

@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Post()
    async createTimetable(@Body() dto: CreateTimetableDto) {
        return await this.timetableService.createTimetable(dto);
    }

    @Get()
    async findTimetable(@Query() gradeName: any) {
        return await this.timetableService.findTimetable(gradeName.gradeName);
    }
}