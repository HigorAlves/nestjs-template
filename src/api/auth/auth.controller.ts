import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Res,
  Put,
  UseGuards,
  Req
} from '@nestjs/common'
import { Request, Response } from 'express'

import { Roles } from './decorators/roles.decorator'
import { JwtAuthGuard } from './guards/jwt.guard'
import { RolesGuard } from './guards/roles.guard'
import { AuthService } from '~/api/auth/auth.service'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'
import { jwtPayload } from '~/types/jwtPayload'
import { Role } from '~/types/role.enum'

@UseInterceptors(SentryInterceptor)
@UseGuards(RolesGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put('updatepassword')
  passwordUpdate(
    @Body() data: { oldPassword: string; newPassword: string },
    @Req() req: Request
  ) {
    const user = req.user as jwtPayload
    console.log(data)
    console.log(user)
  }
}
