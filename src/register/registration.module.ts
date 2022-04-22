import { Module } from "@nestjs/common";
import { UserDataRepository } from "src/user/user.data";
import { UserModule } from "src/user/user.module";
import { UserRepository } from "src/user/user.repository";
import { RegistrationController } from "./registration.controller";
import { RegistrationService } from "./registration.service";

@Module({
    imports: [
        UserModule,
    ],
    controllers: [RegistrationController],
    providers: [
        RegistrationService,
        UserRepository, 
        UserDataRepository,
    ],
    exports: [RegistrationService],
})
export class RegistrationModule {}