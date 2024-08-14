import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UsersModule,
    TokenModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}