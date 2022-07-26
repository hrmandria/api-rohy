import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentEntity } from 'src/parent/parent.entity';
import { ParentRepository } from 'src/parent/parent.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { StudentController } from './student.controller';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, ParentEntity]),
    UserModule
  ],
  controllers: [StudentController],
  providers: [StudentRepository, ParentRepository, StudentService, UserService],
})
export class StudentModule { }
