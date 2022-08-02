import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateNoteDto } from './note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  async createNote(@Body() dto: CreateNoteDto) {
    return await this.noteService.createNote(dto);
  }

  @Get()
  async findNotes(@Query() studentId: any) {
    return await this.noteService.getNotesByStudent(studentId.studentId);
  }
}
