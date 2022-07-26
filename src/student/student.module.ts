import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { ParentEntity } from 'src/parent/parent.entity';
import { ParentRepository } from 'src/parent/parent.repository';
=======
>>>>>>> a83093cc848116165534dc252b2580efb11f2276
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { StudentController } from './student.controller';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
<<<<<<< HEAD
  imports: [
    TypeOrmModule.forFeature([StudentEntity, ParentEntity]),
    UserModule
  ],
  controllers: [StudentController],
  providers: [StudentRepository, ParentRepository, StudentService, UserService],
=======
  imports: [TypeOrmModule.forFeature([StudentEntity]), UserModule],
  controllers: [StudentController],
  providers: [StudentRepository, StudentService, UserService],
>>>>>>> a83093cc848116165534dc252b2580efb11f2276
})
export class StudentModule {}
