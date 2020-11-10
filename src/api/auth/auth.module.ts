import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategys/jwt.strategy';
import * as Dotenv from 'dotenv';

const dotenv = Dotenv.config().parsed;

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: dotenv.JWT_SECRET,
      signOptions: { expiresIn: '28000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
