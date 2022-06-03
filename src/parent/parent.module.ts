import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentController } from "src/student/student.controller";
import { ParentController } from "./parent.controller";
import { ParentEntity } from "./parent.entity";
import { ParentRepository } from "./parent.repository";
import { ParentService } from "./parent.service";

@Module({
    imports: [TypeOrmModule.forFeature([ParentEntity])],
    controllers: [ParentController],
    providers: [ParentRepository, ParentService],
})
export class ParentModule { }