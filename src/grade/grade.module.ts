import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/shared/config/config.service';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { StudentService } from 'src/student/student.service';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectRepository } from 'src/subject/subject.repository';
import { SubjectService } from 'src/subject/subject.service';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { GradeController } from './grade.controller';
import { GradeEntity } from './grade.entity';
import { GradeRepository } from './grade.repository';
import { GradeService } from './grade.service';

@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJwtConfig().secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([GradeEntity, TeacherEntity, StudentEntity, SubjectEntity, UserEntity]),
    UserModule
  ],
  controllers: [GradeController],
  providers: [GradeRepository, GradeService, StudentService, SubjectService, TeacherRepository, StudentRepository, SubjectRepository, UserService, UserRepository],
})
export class GradeModule { }
