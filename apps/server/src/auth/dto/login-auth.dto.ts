import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '@/user/dto/create-user.dto';

export class LoginAuthDto extends PickType(CreateUserDto, [
    'username',
    'password',
]) {}
