import 'source-map-support/register';
import cors from 'cors';
import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { helmetConfig, swaggerConfig, corsConfig } from './main.config';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { LoggerService } from './modules/logger/logger.service';
import { ErrorsInterceptor } from './common/interceptors';
import { IMainInterface } from './common/interfaces';
import { ConfigService } from '@nestjs/config';
import { PaginationInterceptor } from './common/interceptors/pagination.interceptor';
import helmet from 'helmet';
import path from 'path';

class Main implements IMainInterface {
  public configService: ConfigService;

  public loggerService: LoggerService;

  private app: any;

  constructor() {
    this.loggerService = new LoggerService();
  }

  public async bootstrap(): Promise<void> {
    this.usePatches();

    this.app = await NestFactory.create(AppModule, {
      logger: this.loggerService,
    });
    
    this.app.useStaticAssets(path.join(__dirname, '..', 'files'), {
      prefix: '/files',
    });

    this.configService = this.app.get(ConfigService);
    this.app.setGlobalPrefix(this.configService.get('GLOBAL_API_PREFIX'));

    this.useModules();
    this.useInterceptors();
    this.usePipes();
    this.useGuards();
    this.useApiDoc();
    this.useListeners();

    this.app.use(morgan('combined'));

    await this.app.listen(this.configService.get('PORT'));
  }

  public usePatches(): void {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }

  public useInterceptors(): void {
    this.app.useGlobalInterceptors(
      new ErrorsInterceptor(this.loggerService, this.configService),
    );
    this.app.useGlobalInterceptors(new PaginationInterceptor());
  }

  public usePipes(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({ transform: true }),
    );
  }

  public useGuards(): void {

  }

  public useModules(): void {
    this.app.use(passport.initialize());
   // this.app.use(helmet(helmetConfig));
    this.app.use(cors(corsConfig));
  }

  public useApiDoc(): void {
    if (this.configService.get('API_DOC.PATH')) {
      const conf = new DocumentBuilder()
        .setTitle(swaggerConfig.info.title)
        .setDescription(swaggerConfig.info.description)
        .setVersion(swaggerConfig.info.version)
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(this.app, conf, {
        ignoreGlobalPrefix: false,
      });

      SwaggerModule.setup(
        this.configService.get('API_DOC.PATH'),
        this.app,
        document,
      );
    }
  }

  public useListeners(): void {
    process.on('unhandledRejection', (reason: any): void => {
      this.loggerService.error(
        reason.toString(),
        reason.stack || reason,
        'Unhandled Rejection',
      );
      process.exit(1);
    });

    process.on('uncaughtException', (err: any): void => {
      this.loggerService.error({ err }, 'Uncaught Exception');
      process.exit(1);
    });

    process.on('warning', (err: any): void => {
      this.loggerService.error({ err }, 'Warning detected');
    });

    process.on('exit', (code): void => {
      this.loggerService.warn(`Stopped with code: ${code}`);
    });
  }
}

new Main().bootstrap();
