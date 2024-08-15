import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { TwilioConfig } from '../config/config.twilio';

@Module({
  providers: [SmsService, TwilioConfig],
  exports: [SmsService],
})
export class SmsModule {}
