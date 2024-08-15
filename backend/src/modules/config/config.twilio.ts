import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TwilioConfig {
  private twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  getClient(): Twilio {
    return this.twilioClient;
  }

  getSenderPhoneNumber(): string {
    return 'whatsapp:+14155238886';
  }
}
