import { Controller, Post, Body, UseInterceptors } from '@nestjs/common'

import { AuthService } from '~/api/auth/auth.service'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'

@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body)
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user)
  }
}
