import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { IAuthJwtStrategyConfig } from '../interfaces';
import { IJwtPayload } from 'src/modules/jwt';
import { IUser } from 'src/modules/user/interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECURITY.JWT_REFRESH_SECRET')
    } as IAuthJwtStrategyConfig);
  }

  public validate(payload: IJwtPayload): Promise<IUser> {
    return this.authService.getUserFromToken(payload);
  }
}
