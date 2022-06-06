import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_MODULE_OPTIONS } from './jwt.constants';

export const jwtModuleOptions = {
  provide: JWT_MODULE_OPTIONS,
  useFactory: (configService: ConfigService): JwtModuleOptions => ({
    secret: configService.get('SECURITY.JWT_ACCESS_SECRET'),
    signOptions: {
      expiresIn: configService.get('SECURITY.ACCESS_TOKEN_EXPIRED')
    }
  }),
  inject: [ConfigService]
};
