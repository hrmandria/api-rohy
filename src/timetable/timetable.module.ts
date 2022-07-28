import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimetableEntity } from './timetable.entity';
import { TimetableRepository } from './timetable.repository';
import { TimetableService } from './timetable.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimetableEntity])],
  providers: [TimetableRepository, TimetableService],
  exports: [TimetableRepository],
})
export class TimetableModule {}
