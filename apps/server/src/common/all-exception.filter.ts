import {
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { HttpResultError } from './utils/http-result';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const result: HttpResultError = {
            code: +status,
            msg: exception.message,
            timestamp: new Date().toLocaleString(),
            path: request.url,
        };
        Logger.error(exception.message, 'AllException');
        response.status(status).json(result);
    }
}
