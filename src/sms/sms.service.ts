import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ParentMapper } from "src/parent/parent.mapper";
import { ParentRepository } from "src/parent/parent.repository";
import { Twilio } from 'twilio'

@Injectable()
export default class SmsService {
    constructor(
        private twilioClient: Twilio,
        private readonly configService: ConfigService,
        private readonly parentRepository: ParentRepository,
    ) { }

    async initiatePhoneNumberVerification(phone: string) {
        try {
            const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
            const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
            this.twilioClient = new Twilio(accountSid, authToken)
            const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

            return await this.twilioClient.verify.v2.services(serviceSid).verifications.create({
                to: phone,
                channel: 'sms'
            })
        } catch (e) { console.log(e) }
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

    async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {

        console.log(phoneNumber)
        const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

        const result = await this.twilioClient.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: verificationCode })

        if (!result.valid || result.status !== 'approved') {
            throw new Error('Wrong code provided');
        }

        const userPhone = phoneNumber.substring(1);

        let user = await this.parentRepository.findParentWithPhone(userPhone);

        if (result.valid && result.status == 'approved') {
            user[0].isPhoneNumberConfirmed = true;
            const savedParent = await this.parentRepository.save(ParentMapper.fromEntity(user[0]));
            console.log(savedParent);
        }
    }
}