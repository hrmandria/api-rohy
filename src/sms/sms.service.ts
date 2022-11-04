import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export default class SmsService {
    constructor(
        private twilioClient: Twilio,
        private readonly configService: ConfigService,
    ) { }

    async sendMessage(receiverPhoneNumber: string, message: string) {
        const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
        this.twilioClient = new Twilio(accountSid, authToken);

        const senderPhoneNumber = this.configService.get(
            'TWILIO_SENDER_PHONE_NUMBER',
        );
        return this.twilioClient.messages.create({
            body: message,
            from: senderPhoneNumber,
            to: receiverPhoneNumber,
        });
    }
}
