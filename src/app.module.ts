import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbProvider, configOptions } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync(dbProvider),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
