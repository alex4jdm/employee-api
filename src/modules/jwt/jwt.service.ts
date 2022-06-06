import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtService as JS } from '@nestjs/jwt';
import { EJwtType } from './enums';
import { InvalidTokenError } from './errors';
import { IJwtPayload, IJwtService, ITokenPair } from './interfaces';
import { JWT_MODULE_OPTIONS } from './jwt.constants';

@Injectable()
export class JwtService extends JS implements IJwtService {
  constructor(
      @Inject(JWT_MODULE_OPTIONS)
      private readonly jwtModuleOptions: JwtModuleOptions,
      private readonly configService: ConfigService
  ) {
    super(jwtModuleOptions);
  }

  public getToken(payload: Partial<IJwtPayload>, type: EJwtType): string {
    return this.sign(payload, {
      expiresIn: this.configService.get(`SECURITY.${type}_TOKEN_EXPIRED`),
      secret: this.configService.get(`SECURITY.JWT_${type}_SECRET`),
    });
  }

  public parseToken(token: string): IJwtPayload {
    try {
      return this.verify(token);
    } catch (e) {
      throw new InvalidTokenError();
    }
  }

  public getTokenPair(payload: Partial<IJwtPayload>): ITokenPair {
    return {
      accessToken: this.getToken(payload, EJwtType.ACCESS),
      refreshToken: this.getToken(payload, EJwtType.REFRESH)
    };
  }
}
