import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResultError } from './utils/http-result';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const result: HttpResultError = {
            code: status,
            msg: exception.message,
            timestamp: new Date().toLocaleString(),
            path: request.url,
        };
        Logger.error(exception.message, 'HttpException');
        response.status(status).json(result);
    }
}
