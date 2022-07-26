import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DatabaseFileEntity } from "./file.entity";
import { FileMapper } from "./file.mapper";
import { DatabaseFile } from "./file.model";

@Injectable()
export class DatabaseFileRepository {
    constructor(
        @InjectRepository(DatabaseFileEntity)
        private readonly databaseFileRepository: Repository<DatabaseFileEntity>
    ) { }

    async save(dataBuffer: Buffer, filename: string): Promise<DatabaseFile> {
        try {
            const newFile = this.databaseFileRepository.create({ filename, data: dataBuffer })
            const savedFile = await this.databaseFileRepository.save(newFile);
            return FileMapper.fromEntity(savedFile);
        } catch (e) {
            console.log(e);
        }
    }

    async findBy(id: string) {
        return this.databaseFileRepository.findOne(id);
    }
}