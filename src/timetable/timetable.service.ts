import { Injectable } from "@nestjs/common";
import { CreateTimetableDto } from "./timetable.dto";
import { Timetable } from "./timetable.model";
import { FindOptions, TimetableRepository } from "./timetable.repository";

@Injectable()
export class TimetableService {
    constructor(private readonly timetableRepository: TimetableRepository) { }

    async createTimetable(dto: CreateTimetableDto) {
        const timetable = new Timetable();
        timetable.grade = dto.grade;
        timetable.gradeName = timetable.grade.name;
        timetable.courses = dto.courses;
    }

    async findTimetable(options: FindOptions) {
        await this.timetableRepository.findBy(options);
    }

    async deleteTimetable(id: string) {
        return await this.timetableRepository.deleteTimetable(id);
    }
}