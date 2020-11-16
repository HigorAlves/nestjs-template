import { Controller, Post, Body, UseInterceptors, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from '~/api/auth/auth.service'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'

@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body)
  }

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }

  @Post('passwordrecovery')
  async passwordRecovery(
    @Body('email') email: string,
    @Res() response: Response
  ) {
    const result = await this.authService.recoveryPassword(email)
    return response.status(201).send(result)
  }

  @Post('newpassword')
  newPassword(@Body() password: string) {
    console.log(password)
  }

  @Post('passwordupdate')
  passwordUpdate(@Body() data: { oldPassword: string; newPassword: string }) {
    console.log(data)
  }
}
