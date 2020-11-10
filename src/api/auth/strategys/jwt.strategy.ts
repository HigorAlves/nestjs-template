import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as Dotenv from 'dotenv';
import { IUser } from '@/interfaces/user.interface';

const dotenv = Dotenv.config().parsed;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: dotenv.JWT_SECRET,
    });
  }

  async validate(payload: {
    email: Pick<IUser, 'email'>;
    role: Pick<IUser, 'role'>;
  }) {
    return { ...payload };
  }
}
