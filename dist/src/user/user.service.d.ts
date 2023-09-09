import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CheckUserResponseDto, FindUserResponseDto } from './dto/finduser.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';
export type User = any;
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    user(user_id: String): Promise<FindUserResponseDto>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindUserResponseDto[]>;
    findUserByEmail(email: string): Promise<CheckUserResponseDto>;
    createUser(data: CreateUserDto): Promise<FindUserResponseDto>;
    updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<FindUserResponseDto>;
    changeUserPassword(email: string, data: ChangePasswordDto): Promise<FindUserResponseDto>;
    restoreAccount(email: string, data: CreateUserDto): Promise<FindUserResponseDto>;
    deleteUser(userid: string): Promise<any>;
}
