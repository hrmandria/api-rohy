import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeController } from './grade.controller';
import { GradeEntity } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity])],
  controllers: [GradeController],
  providers: [GradeRepository, GradeService],
})
export class GradeModule { }
