import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SmsController } from './sms.controller';
import SmsService from './sms.service';
import { Twilio } from 'twilio';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
      }),
    }),
    Twilio,
  ],
  controllers: [SmsController],
  providers: [SmsService, Twilio],
})
export class SmsModule {}
