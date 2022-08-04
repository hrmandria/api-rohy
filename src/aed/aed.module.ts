import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "src/shared/config/config.service";
import { UserEntity } from "src/user/user.entity";
import { UserModule } from "src/user/user.module";
import { UserRepository } from "src/user/user.repository";
import { UserService } from "src/user/user.service";
import { AedController } from "./aed.controller";
import { AedEntity } from "./aed.entity";
import { AedRepository } from "./aed.repository";
import { AedService } from "./aed.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AedEntity, UserEntity]),
        UserModule,
        JwtModule.register({
            secret: configService.getJwtConfig().secret,
            signOptions: { expiresIn: '3600s' },
        }),
    ],
    controllers: [AedController],
    providers: [AedRepository, AedService, UserRepository, UserService]
})

export class AedModule { }