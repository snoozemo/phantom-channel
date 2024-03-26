import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    generateKeyPairSync,
    publicEncrypt,
    privateDecrypt,
    createHash,
} from 'crypto';

@Injectable()
export class RsaService {
    public publicKey: string;
    public privateKey: string;
    constructor(private readonly configService: ConfigService) {
        this.generateRSAKeyPair();
    }

    private generateRSAKeyPair() {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });
        this.publicKey = publicKey.replace(/[\r\n]/g, '');
        this.privateKey = privateKey;
    }
    /**
     * @description: 使用公钥加密数据
     * @param data
     * @returns
     */
    encrypt(data: string) {
        return publicEncrypt(this.publicKey, Buffer.from(data)).toString(
            'base64',
        );
    }
    /**
     * @description: 使用私钥解密数据
     * @param data
     * @returns
     */
    decrypt(data: string) {
        return privateDecrypt(
            this.privateKey,
            Buffer.from(data, 'base64'),
        ).toString();
    }
    /**
     * @description: 加盐生成md5 base64
     * @param data
     * @returns
     */
    hash(data: string) {
        const salt = this.configService.get('SECRET_KEY');
        return createHash('md5').update(data).update(salt).digest('base64');
    }
}
