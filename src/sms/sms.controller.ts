import { Body, Controller, Post } from "@nestjs/common";
import { SendSMSDto } from "./sms.model";
import SmsService from "./sms.service";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsservice: SmsService) { }

    @Post('send')
    async sendSMS(@Body() request: SendSMSDto) {
        return await this.smsservice.sendMessage(request.receiver, request.message);
    }
}