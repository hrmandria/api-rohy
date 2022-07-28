import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteEntity } from './note.entity';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [NoteRepository, NoteService],
})
export class NoteModule {}
