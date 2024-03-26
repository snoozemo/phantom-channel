import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { success } from '@/common/utils/http-result';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiProperty({
        type: success(String),
    })
    @ApiOperation({ summary: '登录' })
    @Post('login')
    async login(@Body() loginDto: LoginAuthDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }
}
