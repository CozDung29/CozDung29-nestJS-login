import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.user.dto';
import { LoginUserDto } from './dto/auth.login.dto';
import { SmsService } from '../sms/sms.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private smsService: SmsService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signIn(@Body() loginUserDto : LoginUserDto) {
    return this.authService.logIn(loginUserDto.email, loginUserDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Request() req) {
    const userId = req.body.id;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    console.log(userId);
    await this.authService.logOut(userId);
    return { message: 'Logged out successfully' };
  }
  
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Request() req) {
    const userId = req.body.userId;
    const refresh_token = req.body.refresh_token;
    return this.authService.refreshAccessToken(userId, refresh_token);
  }

  @Post('send-otp')
  async sendOtp(@Body('phoneNumber') phoneNumber: string): Promise<{ message: string }> {
    await this.smsService.sendOtp(phoneNumber, '123456'); // Thay '123456' bằng OTP thực tế
    return { message: 'OTP sent successfully' };
  }
}
