import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';  // Assuming you have a Token model

@Module({
  imports: [
    JwtModule,
    SequelizeModule.forFeature([Token]),  
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
