import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from '@/interfaces/user.interface';
import { JWT } from '@/constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.secret,
    });
  }

  async validate(payload: {
    email: Pick<IUser, 'email'>;
    role: Pick<IUser, 'role'>;
  }) {
    return { ...payload };
  }
}
