import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResult } from './utils/http-result';
import { Response } from 'express';
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, HttpResult<T>>
{
    intercept(
        _context: ExecutionContext,
        next: CallHandler,
    ): Observable<HttpResult<T>> {
        return next.handle().pipe(
            map((data) => {
                const response = _context
                    .switchToHttp()
                    .getResponse<Response>();
                const code = response.statusCode || HttpStatus.OK;
                const msg = response.statusMessage || '请求成功';
                const result: HttpResult = { code, msg, data };
                return result;
            }),
        );
    }
}
