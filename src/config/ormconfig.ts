import { ConnectionOptions } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '.env' });

export default {
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  entities: [path.resolve('dist/**/*.entity.{ts,js}')],
  synchronize: false,
  logging: false,
  logger: 'simple-console',
  migrations: ['dist/__migrations/*{.ts,.js}'],
  "migrationsRun": true,
  cli: {
    migrationsDir: 'src/__migrations'
  },
  dropSchema: false
} as ConnectionOptions;
