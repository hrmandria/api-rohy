import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentModule } from 'src/student/student.module';
import { StudentRepository } from 'src/student/student.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ParentController } from './parent.controller';
import { ParentEntity } from './parent.entity';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParentEntity, StudentEntity]),
    UserModule,
    StudentModule,
  ],
  controllers: [ParentController],
  providers: [ParentRepository, StudentRepository, ParentService, UserService],
})
export class ParentModule {}
