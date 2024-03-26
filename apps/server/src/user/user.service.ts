import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    findOneByName(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
