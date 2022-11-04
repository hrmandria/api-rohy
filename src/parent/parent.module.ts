import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileEntity } from 'src/files/file.entity';
import { DatabaseFileModule } from 'src/files/file.module';
import { DatabaseFileRepository } from 'src/files/file.repository';
import { DatabaseFileService } from 'src/files/file.service';
import { StudentEntity } from 'src/student/student.entity';
import { StudentModule } from 'src/student/student.module';
import { StudentRepository } from 'src/student/student.repository';
import { StudentService } from 'src/student/student.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ParentController } from './parent.controller';
import { ParentEntity } from './parent.entity';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParentEntity, StudentEntity, DatabaseFileEntity]),
    UserModule,
    StudentModule,
    DatabaseFileModule,
  ],
  controllers: [ParentController],
  providers: [
    DatabaseFileRepository,
    ParentRepository,
    StudentRepository,
    ParentService,
    StudentService,
    UserService,
    DatabaseFileService,
  ],
})
export class ParentModule { }
