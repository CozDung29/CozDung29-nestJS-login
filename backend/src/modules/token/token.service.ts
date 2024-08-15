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
        const expirationTime = Math.floor(Date.now() / 1000) + expiredTime;
        return this.jwtService.signAsync(
            {
                userId: user.id, 
                email: user.email,
                role: user.role,
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: expiredTime
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
