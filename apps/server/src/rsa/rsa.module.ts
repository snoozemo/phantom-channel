import { Module } from '@nestjs/common';
import { RsaService } from './rsa.service';
import { RsaController } from './rsa.controller';

@Module({
    controllers: [RsaController],
    providers: [RsaService],
})
export class RsaModule {}