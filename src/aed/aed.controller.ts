import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CreateAedDto } from "./aed.dto";
import { AedService } from "./aed.service";

@Controller('aed')
export class AedController {
    constructor(private readonly aedService: AedService) { }

    @Post()
    async createAed(@Body() dto: CreateAedDto) {
        return await this.aedService.createAed(dto);
    }

    @Get()
    async findAll() {
        return await this.aedService.findAll();
    }

    @Get('findById')
    async findById(@Query() id: any) {
        return await this.aedService.findBy(id.id);
    }

    @Delete(':id')
    async deleteAed(@Query() id: any) {
        return await this.aedService.deleteAed(id.id)
    }

    @Get('byIdNumber')
    async getByIdNumber(@Query() idNumber: any) {
        return await this.aedService.getAedByIdNumber(idNumber.idNumber);
    }
}