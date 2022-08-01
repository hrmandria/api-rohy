import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileEntity } from './file.entity';
import { DatabaseFileRepository } from './file.repository';
import { DatabaseFileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFileEntity])],
  providers: [DatabaseFileRepository, DatabaseFileService],
})
export class DatabaseFileModule {}
