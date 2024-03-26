import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { success } from '../common/utils/http-result';
import { AuthGuard } from '@/auth/auth.guard';
import { RsaService } from '@/rsa/rsa.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly rsaService: RsaService,
    ) {}
    @ApiResponse({
        description: '创建用户结果',
        type: success(CreateUserDto),
        status: HttpStatus.CREATED,
    })
    @ApiOperation({ summary: '创建用户' })
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        const { password, email } = createUserDto;
        const { decrypt, hash } = this.rsaService;
        createUserDto.password = this.rsaService.hash(password);
        createUserDto.email = this.rsaService.hash(email);
        // Logger.log(decrypt(password));

        return this.userService.create(createUserDto);
    }

    @Get('/test')
    @UseGuards(AuthGuard)
    findAll(@Req() req: Request) {
        return req['user'];
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
