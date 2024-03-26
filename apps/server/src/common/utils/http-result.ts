import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpResult<D = any> {
    @ApiProperty({ title: '状态码', example: 200 })
    code: HttpStatus;
    @ApiProperty({ title: '消息', example: '请求成功' })
    msg?: string;
    @ApiProperty({ title: '数据', example: {} })
    data?: D;
    constructor(data?: D, code?: HttpStatus, msg?: string) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
export class HttpResultError {
    @ApiProperty({ title: '状态码', example: 400 })
    code: HttpStatus;
    @ApiProperty({ title: '消息', example: '请求失败' })
    msg: string;
    @ApiProperty({ title: '时间戳', example: '2021-01-01 00:00:00' })
    timestamp: string;
    @ApiProperty({ title: '路径', example: '/path/error' })
    path: string;
}

export function success<T>(d?: T, c?: HttpStatus, m?: string) {
    class SuccessResult extends HttpResult<T> {
        @ApiProperty({ title: '数据', type: d })
        data: T = d;
        code = c || HttpStatus.OK;
        msg = m || '请求成功';
        constructor(data?: T, code?: HttpStatus, msg?: string) {
            super(data, code, msg);
        }
    }
    return SuccessResult;
}
