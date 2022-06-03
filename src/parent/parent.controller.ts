import { Body, Controller, Post } from '@nestjs/common';
import { CreateParentDto } from './parent.dto';
import { ParentService } from './parent.service';

@Controller()
export class ParentController {
    constructor(private readonly parentService: ParentService) { }
    @Post('createParent')
    async createParent(@Body() dto: CreateParentDto) {
        return this.parentService.createParent(dto);
    }
}
