import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/auth.user.dto';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';  // Import mặc định

@Injectable()
export class AuthService {
  private redisClient: Redis;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6381,
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '120s',
    });

    // Lưu refresh_token lên Redis
    await this.redisClient.set(`refresh_token_${user.id}`, refresh_token, 'EX', 120);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.usersService.createUser(createUserDto);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
