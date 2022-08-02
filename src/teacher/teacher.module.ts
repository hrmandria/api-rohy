import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from 'src/grade/grade.entity';
import { GradeRepository } from 'src/grade/grade.repository';
import { configService } from 'src/shared/config/config.service';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { SubjectService } from 'src/subject/subject.service';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TeacherController } from './teacher.controller';
import { TeacherEntity } from './teacher.entity';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJwtConfig().secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([TeacherEntity, SubjectEntity, UserEntity, GradeEntity])
  ],
  controllers: [TeacherController],
  providers: [TeacherRepository, UserRepository, TeacherService, SubjectService, SubjectRepository, UserService, GradeRepository],
})
export class TeacherModule { }
