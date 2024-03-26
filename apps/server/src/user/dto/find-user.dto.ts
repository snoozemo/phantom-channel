import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class FindUserDto {
    @ApiProperty({ title: '邮箱' })
    @IsOptional()
    @IsEmail(null, { message: '邮箱格式不正确' })
    email: string;

    @ApiProperty({ title: '用户名' })
    @IsOptional()
    name: string;
}
