import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Res,
  Put
} from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from '~/api/auth/auth.service'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'

@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() response: Response): Promise<Response> {
    const { status, message, token } = await this.authService.login(body)
    return response.status(status).send({ message, token })
  }

  @Post('register')
  async register(
    @Body() user: CreateUserDto,
    @Res() response: Response
  ): Promise<Response> {
    const result = await this.authService.register(user)
    return response.status(result.status).send(result)
  }

  @Post('recoverpassword')
  async passwordRecovery(
    @Body('email') email: string,
    @Res() response: Response
  ): Promise<Response> {
    const { status, message } = await this.authService.recoveryPassword(email)
    return response.status(status).send(message)
  }

  @Post('newpassword')
  async newPassword(
    @Body() data: { email: string; password: string; code: string },
    @Res() response: Response
  ): Promise<Response> {
    const { status, message, error } = await this.authService.newPassword(
      data.email,
      data.password,
      data.code
    )
    return response.status(status).send({ message, error })
  }

  @Put('passwordupdate')
  passwordUpdate(@Body() data: { oldPassword: string; newPassword: string }) {
    console.log(data)
  }
}
