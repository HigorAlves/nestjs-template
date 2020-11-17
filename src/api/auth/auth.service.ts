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

  async login(data: {
    email: string
    password: string
  }): Promise<ResponseType> {
    const result = await this.validateUser(data.email, data.password)

    if (result.success) {
      const payload = { email: result.data.email, role: result.data.role }
      return {
        token: this.jwtService.sign(payload),
        message: 'Successfully logged in',
        status: 200,
        error: false
      }
    }

    return { message: 'Invalid password or email', error: true, status: 401 }
  }

  async register(userDTO: CreateUserDto): Promise<ResponseType> {
    const user = await this.usersService.getByEmail(userDTO.email)

    if (!user) {
      return await this.usersService.create(userDTO)
    }

    return {
      status: 400,
      message: 'This user already exists!',
      error: false
    }
  }

  async recoveryPassword(email: string): Promise<ResponseType> {
    await this.repository.createTTL()
    const alreadyHaveActiveCode = await this.repository.alreadyGenerated(email)

    if (!alreadyHaveActiveCode) {
      await this.repository.createRecoveryCode(email)
      return {
        error: false,
        message: '',
        status: 200
      }
    } else {
      return {
        status: 418,
        error: false,
        message: 'There is already a code generated for this email'
      }
    }
  }

  async newPassword(
    email: string,
    password: string,
    code: string
  ): Promise<ResponseType> {
    const user = await this.usersService.getByEmail(email)
    const isCodeValid = await this.repository.verifyRecoverToken(code)
    const responseData = {
      status: 400,
      error: true,
      message: 'Was not possible change this password'
    }

    if (!user) {
      responseData.message = 'This user is not listed'
      return responseData
    }
    if (!isCodeValid) {
      responseData.message = 'This code is no more valid'
      return responseData
    }

    const result = await this.usersService.updatePassword(email, password)

    if (result.password) {
      this.repository.deleteRecoverToken(code)

      return {
        status: 200,
        error: false,
        message: 'Password updated'
      }
    }

    return responseData
  }
}
