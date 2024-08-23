import { TokenRepository } from './../token/token.repository';
import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from './dto/auth.user.dto';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { RedisConfig } from '../config/config.redis';
import { AppMailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  private readonly redisClient: Redis;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private tokenRepository: TokenRepository,
    private appMailerService: AppMailerService,
    redisConfig : RedisConfig
  ) {
    this.redisClient = redisConfig.getClient();
  }

  async logIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // Kiểm tra xem đã có refresh token trong Redis chưa
    const existingToken = await this.redisClient.get(`refresh_token_${user.id}`);
    if (existingToken) {
      throw new ConflictException('User already logged in from another device/session');
    }
    const payload = { id: user.id, email: user.email, role: user.role };

    const access_token = await this.tokenService.renderToken(payload, 20);
    const refresh_token = await this.tokenService.renderToken(payload, 100);

    // Lưu refresh_token lên Redis
    await this.redisClient.set(`refresh_token_${user.id}`, refresh_token, 'EX', 120);

    const token = {
      userId : user.id,
      refresh_token: refresh_token
    }

    this.tokenRepository.add(token);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ email: string, access_token: string }> {
    const existingUser = await this.userService.getUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userService.createUser(createUserDto);
    const payload = { id: user.id, email: user.email };
    const emailConfirmationToken = await this.tokenService.renderToken({ email: user.email }, 60);

    await this.appMailerService.sendUserConfirmation({
      email: user.email,
      token: emailConfirmationToken,
    });

    return {
      email: user.email,
      access_token: await this.tokenService.renderToken(payload, 50),
    };
  }

  async verifyEmail(token : string): Promise<void>{
    // const user = await this.userService.getUserByToken(token);

    const decodeToken = await this.tokenService.verifyToken(token);
    const user = await this.userService.getUserByEmail(decodeToken.email);

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    user.isVerified = true;
    await user.save();
  }

  async logOut(userId: number): Promise<void> {
    // const redisKey = `refresh_token_${userId}`;

    // console.log(redisKey);

    // const existingToken = await this.redisClient.get(redisKey);
    // console.log('Existing refresh_token:', existingToken);
    
    // Xóa refresh_token khỏi Redis
    await this.redisClient.del(`refresh_token_${userId}`);
    
    // Xóa token khỏi db
    await this.tokenRepository.deleteByUserId(userId);
  }

  async refreshAccessToken(userId: number, refresh_token: string): Promise<{access_token: string }> {
    // const storedToken = await this.tokenRepository.findByUserId(userId);
    const storedToken = await this.redisClient.get(`refresh_token_${userId}`);

    console.log(storedToken);

    if (!storedToken || storedToken != refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: userId, refresh_token: storedToken };
    const newAccessToken = await this.tokenService.renderToken(payload, 10);

    return {
      access_token: newAccessToken
    };
  }
}
