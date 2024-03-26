import { Controller, Get } from '@nestjs/common';
import { RsaService } from './rsa.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
@ApiTags('Rsa')
@Controller('rsa')
export class RsaController {
    constructor(private readonly rsaService: RsaService) {}
    @ApiProperty()
    @ApiOperation({ summary: '获取公钥' })
    @Get('public')
    getPublicKey() {
        return this.rsaService.publicKey;
    }
}
