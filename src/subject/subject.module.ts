import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from 'src/grade/grade.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity, UserEntity])],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, UserRepository],
})
export class SubjectModule { }
