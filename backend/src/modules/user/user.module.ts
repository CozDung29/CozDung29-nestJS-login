import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { SequelizeModule  } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    TokenModule
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
