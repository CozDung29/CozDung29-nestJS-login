import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity'
import { CreateUserDto } from '../auth/dto/auth.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

}
