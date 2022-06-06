import { ConfigService } from '@nestjs/config';
import { IHashPasswordProvider } from './interfaces';
import { BcryptProvider } from './providers';
import { HASH_PASSWORD_PROVIDER } from './user.constants';

export const hashPasswordProvider = {
  provide: HASH_PASSWORD_PROVIDER,
  useFactory: (configService: ConfigService): IHashPasswordProvider => {
    const saltRound = configService.get('SECURITY.PASSWORD_SALT_ROUND');
    return new BcryptProvider(saltRound);
  },
  inject: [ConfigService]
};
