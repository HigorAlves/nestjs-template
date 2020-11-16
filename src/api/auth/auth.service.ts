import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthRepository } from './auth.repository'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { UserService } from '~/api/user/user.service'
import { UserEntity } from '~/entities/user.entity'
import { ResponseType } from '~/types/response'

@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
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

  async recoveryPassword(email: string): Promise<ResponseType> {
    await this.repository.createTTL()
    const alreadyHaveActiveCode = await this.repository.alreadyGenerated(email)

    if (!alreadyHaveActiveCode) {
      const success = await this.repository.createRecoveryCode(email)
      return {
        success,
        error: false,
        message: ''
      }
    } else {
      return {
        success: true,
        error: false,
        message: 'There is already a code generated for this email'
      }
    }
  }
}
