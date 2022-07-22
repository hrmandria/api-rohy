import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { ParentController } from './parent.controller';
import { ParentEntity } from './parent.entity';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParentEntity, StudentEntity])],
  controllers: [ParentController],
  providers: [ParentRepository, StudentRepository, ParentService],
})
export class ParentModule {}
