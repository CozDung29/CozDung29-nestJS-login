import { TokenRepository } from './../token/token.repository';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from './dto/auth.user.dto';
// import { LoginUserDto } from './dto/auth.login.dto';
// import { RedisConfig } from '../config/config.redis';
import * as bcrypt from 'bcrypt';  // Import mặc định


@Injectable()
export class AuthService {
  // private redisConfig : RedisConfig;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private tokenRepository : TokenRepository
  ) {}

  async logIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, role: user.role };

    const access_token = await this.tokenService.renderToken(payload, 20);
    const refresh_token = await this.tokenService.renderToken(payload, 100);

    // Lưu refresh_token lên Redis
    // await this.redisClient.set(`refresh_token_${user.id}`, refresh_token, 'EX', 120);

    const token = {
      userId : user.id,
      access_token: access_token,
      refresh_token: refresh_token
    }

    this.tokenRepository.add(token);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.userService.getUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userService.createUser(createUserDto);

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.tokenService.renderToken(payload, 50),
    };
  }

  async logOut(userId: number): Promise<void> {
    await this.tokenRepository.deleteByUserId(userId);
  }

  async refreshAccessToken(userId: number, refresh_token: string): Promise<{access_token: String }> {
    const storedToken = await this.tokenRepository.findByUserId(userId);

    console.log(storedToken);

    console.log(storedToken.dataValues.refreshToken);

    if (!storedToken || storedToken.dataValues.refreshToken != refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: userId, refresh_token: storedToken.refreshToken };
    const newAccessToken = await this.tokenService.renderToken(payload, 10);

    return {
      access_token: newAccessToken
    };
  }
}
