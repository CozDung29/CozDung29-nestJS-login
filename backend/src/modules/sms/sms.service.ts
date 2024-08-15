import { Injectable } from '@nestjs/common';
import { TwilioConfig } from '../config/config.twilio';

@Injectable()
export class SmsService {
  constructor(private twilioConfig: TwilioConfig) {}

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    const client = this.twilioConfig.getClient();
    const senderPhoneNumber = this.twilioConfig.getSenderPhoneNumber();

    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: senderPhoneNumber,
      to: `whatsapp:${phoneNumber}`,
    });
  }
}
