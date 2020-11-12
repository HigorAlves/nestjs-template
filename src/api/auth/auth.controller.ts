import { Controller, Post, Body, UseInterceptors } from '@nestjs/common'

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
  passwordRecovery(@Body('email') email: string) {
    console.log(email)
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
