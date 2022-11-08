import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentRepository } from 'src/student/student.repository';
import { BulletinController } from './bulletin.controller';
import { BulletinEntity } from './bulletin.entity';
import { BulletinRepository } from './bulletin.repository';
import { BulletinService } from './bulletin.service';

@Module({
  imports: [TypeOrmModule.forFeature([BulletinEntity, StudentEntity])],
  controllers: [BulletinController],
  providers: [BulletinRepository, BulletinService, StudentRepository],
})
export class BulletinModule { }
