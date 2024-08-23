import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from '../auth/dto/auth.user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private tokenService: TokenService
  ) {}

  async create(createUserDto : CreateUserDto): Promise<User> {
    
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const userToCreate = {
      ...createUserDto,
      isVerified: false,
    }
    return this.userModel.create(userToCreate);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  async updateIsVerified(email: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    user.isVerified = true;
    await user.save();

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findByToken(token: string): Promise<User | undefined> {
    const decodeToken = await this.tokenService.verifyToken(token);
    const email = decodeToken.email;
    return this.userModel.findOne({ where: { email } });
  }
}
