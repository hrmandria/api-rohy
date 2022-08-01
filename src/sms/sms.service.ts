import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { result } from "lodash";
import { Twilio } from 'twilio'
import { PhoneNumberContext } from "twilio/lib/rest/lookups/v1/phoneNumber";

@Injectable()
export default class SmsService {
    constructor(
        private twilioClient: Twilio,
        private readonly configService: ConfigService,
    ) { }

    async initiatePhoneNumberVerification(phone: string) {
        try {
            const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
            const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
            this.twilioClient = new Twilio(accountSid, authToken)

            const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

            return await this.twilioClient.verify.v2.services(serviceSid).verifications.create({ to: phone, channel: "sms" })
        } catch (e) {
            console.log(e);
        }
    }

    async sendMessage(receiverPhoneNumber: string, message: string) {
        const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
        this.twilioClient = new Twilio(accountSid, authToken)

        const senderPhoneNumber = this.configService.get('TWILIO_SENDER_PHONE_NUMBER');
        return this.twilioClient.messages
            .create({
                body: message,
                from: senderPhoneNumber,
                to: receiverPhoneNumber
            })
    }
}