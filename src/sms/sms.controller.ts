import { Body, Controller, Post, Query } from "@nestjs/common";
import { SendSMSDto, VerifyPhoneNumberDto } from "./sms.model";
import SmsService from "./sms.service";

@Controller('sms')
export class SmsController {
    constructor(private readonly smsservice: SmsService) { }

    @Post('send')
    async sendSMS(@Body() request: SendSMSDto) {
        return await this.smsservice.sendMessage(request.receiver, request.message);
    }

    @Post('verify')
    async verifyPhoneNumber(@Body() request: VerifyPhoneNumberDto) {
        try {
            return await this.smsservice.initiatePhoneNumberVerification(request.phone);
        } catch (e) {
            console.log(e.message);
        }
    }
}