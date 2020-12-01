import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Res,
  Put,
  UseGuards,
  Request
} from '@nestjs/common'
import { Response } from 'express'

import { JwtAuthGuard } from '~/api/auth/guards/jwt.guard'
import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { UpdateUserDto } from '~/api/user/dto/updateUser.dto'
import { UserService } from '~/api/user/user.service'
import { jwtPayload } from '~/types/jwtPayload'

@Controller('user')
export class UserController {
  private logger: Logger = new Logger('USER_CONTROLLER')

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Body('email') email: string, @Res() response: Response) {
    const result = await this.userService.getByEmail(email)
    return response.status(200).send(result)
  }

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDto,
    @Res() response: Response
  ) {
    this.logger.debug(`${createUserDTO.email} creating a new user`)
    const result = await this.userService.create(createUserDTO)
    return response.status(201).send(result)
  }

  @Delete()
  async delete(
    @Body('id') id: string,
    @Res() response: Response,
    @Request() req
  ) {
    const payload: jwtPayload = req.user as jwtPayload
    if (payload.role === 'admin') {
      const result = await this.userService.delete(id)
      return response.status(201).send({ success: result })
    } else {
      return response.status(401)
    }
  }

  @Put()
  async update(
    @Body() user: UpdateUserDto,
    @Body('id') id: string,
    @Res() response: Response
  ) {
    const result = await this.userService.update(id, user)
    return response.status(201).send(result)
  }
}
