import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SmsController } from "./sms.controller";
import SmsService from "./sms.service";
import { Twilio } from 'twilio'
import { ParentService } from "src/parent/parent.service";
import { ParentRepository } from "src/parent/parent.repository";
import { ParentEntity } from "src/parent/parent.entity";
import { ParentModule } from "src/parent/parent.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseFileEntity } from "src/files/file.entity";
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                TWILIO_ACCOUNT_SID: Joi.string().required(),
                TWILIO_AUTH_TOKEN: Joi.string().required(),
                TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
                TWILIO_SENDER_PHONE_NUMBER: Joi.string().required()
            })
        }),
        Twilio,
        TypeOrmModule.forFeature([ParentEntity, DatabaseFileEntity]),
        ParentModule
    ],
    controllers: [SmsController],
    providers: [SmsService, Twilio, ParentRepository]
})

export class SmsModule { }