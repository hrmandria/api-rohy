import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseFileRepository } from './file.repository';

@Injectable()
export class DatabaseFileService {
  constructor(
    private readonly databaseFilesRepository: DatabaseFileRepository,
  ) {}

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    return await this.databaseFilesRepository.save(dataBuffer, filename);
  }

  async getFileById(fileId: string) {
    const file = await this.databaseFilesRepository.findBy(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
