import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentController } from "src/student/student.controller";
import { StudentEntity } from "src/student/student.entity";
import { StudentModule } from "src/student/student.module";
import { StudentRepository } from "src/student/student.repository";
import { UserEntity } from "src/user/user.entity";
import { UserModule } from "src/user/user.module";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { ParentController } from "./parent.controller";
import { ParentEntity } from "./parent.entity";
import { ParentRepository } from "./parent.repository";
import { ParentService } from "./parent.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ParentEntity, StudentEntity]),
        UserModule,
        StudentModule
    ],
    controllers: [ParentController],
    providers: [ParentRepository, StudentRepository, ParentService, UserService],
})
export class ParentModule { }