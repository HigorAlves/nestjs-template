import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategys/jwt.strategy'
import { LocalStrategy } from './strategys/local.strategy'
import { UserModule } from '~/api/user/user.module'
import { JWT } from '~/constants'

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([AuthRepository]),
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: JWT.duration }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
