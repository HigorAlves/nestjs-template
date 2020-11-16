import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { UserService } from '~/api/user/user.service'
import { UserEntity } from '~/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    plainPassword: string
  ): Promise<{ success: boolean; data?: UserEntity }> {
    const user = await this.usersService.getByEmail(email)

    if (user) {
      const isPasswordEqual = bcrypt.compareSync(plainPassword, user.password)
      if (isPasswordEqual) {
        return { success: true, data: user }
      }
    }

    return { success: false }
  }

  async login(data: { email: string; password: string }) {
    const result = await this.validateUser(data.email, data.password)

    if (result.success) {
      const payload = { email: result.data.email, role: result.data.role }
      return { accessToken: this.jwtService.sign(payload) }
    }

    return { error: 'Password or Email invalid' }
  }

  async register(userDTO: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDTO.email)

    if (!user) {
      const result = await this.usersService.create(userDTO)
      return result
    }

    return { success: true, message: 'This user already exists!', error: false }
  }
}
