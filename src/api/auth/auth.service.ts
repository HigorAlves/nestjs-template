import { Injectable } from '@nestjs/common';
import { UserService } from '@/api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@/entities/user.entity';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<{ success: boolean; data?: UserEntity }> {
    const user = await this.usersService.get(email);

    if (user) {
      const isPasswordEqual = bcrypt.compareSync(plainPassword, user.password);
      if (isPasswordEqual) {
        return { success: true, data: user };
      }
    }

    return { success: false };
  }

  async login(data: { email: string; password: string }) {
    const result = await this.validateUser(data.email, data.password);

    if (result.success) {
      const payload = { email: result.data.email, role: result.data.role };
      return { accessToken: this.jwtService.sign(payload) };
    }

    return { error: 'Password or Email invalid' };
  }

  async register(user: CreateUserDto) {
    return;
  }
}
