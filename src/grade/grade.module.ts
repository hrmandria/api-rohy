import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './grade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GradeEntity])],
    controllers: [],
    providers: []
})
export class GradeModule { }
