import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@/common/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RsaService } from '@/rsa/rsa.service';

@Module({
    imports: [ConfigModule],
    controllers: [UserController],
    providers: [UserService, PrismaService, JwtService, RsaService],
})
export class UserModule {}
