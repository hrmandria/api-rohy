import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileEntity } from "src/files/file.entity";
import { DatabaseFileModule } from "src/files/file.module";
import { DatabaseFileRepository } from "src/files/file.repository";
import { DatabaseFileService } from "src/files/file.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AdminController } from "./admin.controller";
import { AdminEntity } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([AdminEntity, DatabaseFileEntity]),
      UserModule,
      DatabaseFileModule,
    ],
    controllers: [AdminController],
    providers: [
      DatabaseFileRepository,
      AdminRepository,
      AdminService,
      UserService,
      DatabaseFileService,
    ],
  })
  export class AdminModule { }