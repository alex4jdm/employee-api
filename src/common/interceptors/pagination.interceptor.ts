import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import isNil from 'lodash/isNil';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_PAGE } from '../constants';
import { EPaginationHeaders, EPaginationTriggerFields } from '../enums';
import { IPaginationResults } from '../interfaces';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  public isPaginatedResponse(data: any = {}): data is IPaginationResults {
    return Object.values(EPaginationTriggerFields).every((key: string): boolean => !isNil(data[key]));
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data): any => {
        if (!this.isPaginatedResponse(data)) {
          return data;
        }

        this.setPaginationHeaders(context, data);
        return data.items;
      })
    );
  }

  private setPaginationHeaders(context: ExecutionContext, data: IPaginationResults): void {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    response.set({
      [EPaginationHeaders.PAGE_LIMIT]: request.query.limit || DEFAULT_LIMIT,
      [EPaginationHeaders.PAGE_OFFSET]: request.query.offset || DEFAULT_OFFSET,
      [EPaginationHeaders.CURRENT_PAGE]: request.query.page || DEFAULT_PAGE,
      [EPaginationHeaders.TOTAL_PAGES]: data.meta.totalPages,
      [EPaginationHeaders.TOTAL_RECORDS]: data.meta.totalItems,
    });
  }
}
