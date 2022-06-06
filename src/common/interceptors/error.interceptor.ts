import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../../modules/logger/logger.service';
import { EConfigEnvironment } from '../enums';
import { EServiceErrorStatus } from '../errors/enums/';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private static ERR_MESSAGE_UNKNOWN_DEFAULT = 'Oops, something went wrong...';

  private static ERR_MESSAGE_DEFAULT = 'Oops...';

  constructor(private readonly loggerService: LoggerService, private readonly configService: ConfigService) {}

  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(
        (err: any): Observable<never> => {
          if (err.constructor.name && err.response) {
            err.response.name = err.constructor.name;
          }

          this.loggerService.error(err.stack || err);

          if (err instanceof HttpException) {
            return throwError(err);
          }

          const ExceptionToThrow: any = this._getHttpExceptionClass(err.status);
          const errorMessage = this._getErrorMessage(ExceptionToThrow, err);

          return throwError(new ExceptionToThrow(errorMessage));
        }
      )
    );
  }

  private _getHttpExceptionClass(serviceErrorStatus: EServiceErrorStatus): any {
    const mapDictionary = {
      [EServiceErrorStatus.ERR_NOT_FOUND]: NotFoundException,
      [EServiceErrorStatus.ERR_CONFLICT]: ConflictException,
      [EServiceErrorStatus.ERR_BAD_INPUT_DATA]: BadRequestException,
      [EServiceErrorStatus.ERR_ACCESS_FORBIDDEN]: ForbiddenException,
    };

    return mapDictionary[serviceErrorStatus] || InternalServerErrorException;
  }

  private _getErrorMessage(exceptionToThrow: any, initialError: any): string | Error['stack'] {
    const safeEnvs = [EConfigEnvironment.development, EConfigEnvironment.staging];

    if (safeEnvs.includes(this.configService.get('NODE_ENV'))) {
      return initialError.stack || initialError.message || ErrorsInterceptor.ERR_MESSAGE_DEFAULT;
    }

    if (exceptionToThrow === InternalServerErrorException) {
      return ErrorsInterceptor.ERR_MESSAGE_UNKNOWN_DEFAULT;
    }

    return initialError.message || ErrorsInterceptor.ERR_MESSAGE_DEFAULT;
  }
}
