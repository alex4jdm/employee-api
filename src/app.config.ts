import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { config, configSchemaValidation } from './config';

export const dbProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: configService.get('DB.TYPE') as 'postgres',
    url: configService.get('DB.CONNECTION_STRING'),
    entities: [path.resolve('./dist/**/*.entity.{ts,js}')],
    synchronize: configService.get('DB.AUTO_SYNC'),
    migrations: [path.resolve('./dist/__migrations/*.{ts,js}')],
    migrationsRun: true,
    logging: false,
  }),
  inject: [ConfigService],
};

export const configOptions: ConfigModuleOptions = {
  envFilePath: path.resolve(process.cwd(), '.env'),
  load: [config],
  validationSchema: configSchemaValidation,
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
  isGlobal: true,
};
