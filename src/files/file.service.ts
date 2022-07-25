import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import DatabaseFile from "./file.entity";

@Injectable()
export class DatabaseFileService {
    constructor(
        @InjectRepository(DatabaseFile)
        private databaseFilesRepository: Repository<DatabaseFile>,
    ) { }

    async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
        const newFile = this.databaseFilesRepository.create({
            filename,
            data: dataBuffer
        })
        await this.databaseFilesRepository.save(newFile);
        return newFile;
    }

    async getFileById(fileId: number) {
        const file = await this.databaseFilesRepository.findOne(fileId);
        if (!file) {
            throw new NotFoundException();
        }
        return file;
    }
}