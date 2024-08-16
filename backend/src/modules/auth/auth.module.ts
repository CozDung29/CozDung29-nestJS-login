import { TokenRepository } from './../token/token.repository';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { RedisConfig } from '../config/config.redis';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    SmsModule
  ],
  providers: [AuthService, RedisConfig],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}