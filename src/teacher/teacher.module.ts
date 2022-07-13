import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherController } from "./teacher.controller";
import { TeacherEntity } from "./teacher.entity";
import { TeacherRepository } from "./teacher.repository";
import { TeacherService } from "./teacher.service";

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity])],
    controllers: [TeacherController],
    providers: [TeacherRepository, TeacherService]
})

export class TeacherModule {}