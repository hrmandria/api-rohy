import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from 'src/grade/grade.entity';
import { GradeRepository } from 'src/grade/grade.repository';
import { GradeService } from 'src/grade/grade.service';
import { configService } from 'src/shared/config/config.service';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { TeacherService } from 'src/teacher/teacher.service';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from './subject.entity';
import { SubjectRepository } from './subject.repository';
import { SubjectService } from './subject.service';

@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJwtConfig().secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([SubjectEntity, TeacherEntity, GradeEntity, UserEntity]),
    UserModule
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, UserRepository, UserService, TeacherService, TeacherRepository, GradeRepository],
})
export class SubjectModule { }
