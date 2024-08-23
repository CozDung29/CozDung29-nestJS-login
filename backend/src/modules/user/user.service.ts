import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { CreateUserDto } from '../auth/dto/auth.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findByToken(token);
  }

  async verifyUser(email: string): Promise<User | null> {
    return this.userRepository.updateIsVerified(email);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
