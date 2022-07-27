import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TimetableEntity } from "./timetable.entity";
import { TimetableMapper } from "./timetable.mapper";
import { Timetable } from "./timetable.model";

export interface FindOptions {
    gradeName: string
}

@Injectable()
export class TimetableRepository {
    constructor(
        @InjectRepository(TimetableEntity)
        private readonly timetableRepository: Repository<TimetableEntity>
    ) { }

    async findBy(options: FindOptions): Promise<Timetable | undefined> {
        try {
            const timetableEntity = await this.timetableRepository.findOne({ ...options });

            if (!timetableEntity) {
                return undefined
            }

            return TimetableMapper.fromEntity(timetableEntity);
        } catch (e) {
            console.log(e)
        }
    }

    async save(timetable: Timetable) {
        try {
            const timetableEntity = TimetableMapper.toEntity(timetable);
            const savedTimetableEntity = await this.timetableRepository.save(timetableEntity);
            return TimetableMapper.fromEntity(savedTimetableEntity);
        } catch (e) {
            console.log(e);
            throw new Error('Cannot save timetable');
        }
    }

    async deleteTimetable(id: string) {
        return await this.timetableRepository.delete(id);
    }
}