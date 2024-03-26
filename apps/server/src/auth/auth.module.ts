import { Injectable, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/common/prisma.service';
import { RsaService } from '@/rsa/rsa.service';

@Injectable()
export class JwtClass implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {
        if (!this.configService.get('SECRET_KEY')) {
            throw new Error('JWT_SECRET Miss');
        }
        Logger.log('JwtSecret is ok', 'JwtSecretLoaded');
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get('SECRET_KEY'),
            signOptions: {
                expiresIn: '7d',
            },
        };
    }
}

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtClass,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService, RsaService],
})
export class AuthModule {}
