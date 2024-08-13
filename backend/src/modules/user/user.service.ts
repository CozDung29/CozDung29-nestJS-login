import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dto/auth.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    console.log('Searching for user with email:', email);
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const newUser = new User();

    newUser.email = email;
    newUser.password = await this.hashPassword(password);
    newUser.role = role;

    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
