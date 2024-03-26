import { RsaService } from '@/rsa/rsa.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public publicKey: string;
    public privateKey: string;
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private readonly rsaService: RsaService,
    ) {}

    async signIn(username: string, password: string): Promise<string> {
        const user = await this.usersService.findOneByName(username);
        if (user?.password !== this.rsaService.hash(password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, username: user.username };
        return 'Bearer ' + (await this.jwtService.signAsync(payload));
    }
}
