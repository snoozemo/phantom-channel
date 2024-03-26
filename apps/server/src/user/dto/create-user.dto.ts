import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ title: '用户名', minLength: 5, maxLength: 20 })
    @IsString({ message: '用户名必须是字符串' })
    @Length(5, 20, { message: '用户名长度必须在5到20之间' })
    username: string;

    @ApiProperty({ title: '邮箱' })
    @IsEmail({}, { message: '邮箱格式不正确' })
    email: string;

    @ApiProperty({ title: '密码', minLength: 6, maxLength: 20 })
    @IsString({ message: '密码必须是字符串' })
    @Length(6, 20, { message: '密码长度必须在6到20之间' })
    password: string;

    @ApiProperty({ title: '头像' })
    @IsString({ message: '头像必须是字符串' })
    @ApiPropertyOptional()
    avatar?: string;
}
