import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly jwtService: JwtService
    ) {}

    async renderToken(user: any, expiredTime: number): Promise<string> {
        return this.jwtService.signAsync(
            {
                userID: user.id, 
                role: user.role,
                exp: expiredTime,
            },
            {
                secret: process.env.JWT_SECRET,
            }
        );
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return decoded;
        } catch (error) {
            return error.message;
        }
    }
    
}
