import { Body, Controller, Post } from "@nestjs/common";
import { CreateNoteDto } from "./note.dto";
import { NoteService } from "./note.service";

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    async createNote(@Body() dto: CreateNoteDto) {
        return this.noteService.createNote(dto)
    }
}