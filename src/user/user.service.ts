import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CheckUserResponseDto, FindUserResponseDto } from './dto/finduser.dto';
import { CreateUserDto } from './dto/createuser.dto';
import * as dayjs from 'dayjs'
import { ChangePasswordDto } from './dto/changepassword.dto';
import * as crypto from 'crypto';
import { jwtConstants } from 'src/auth/constant';

export type User = any;
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(UserService.name);
    async user(
        user_id: String,
    ): Promise<FindUserResponseDto> {
        try {
            const userdata = await this.prisma.user.findUnique({
                where: {
                    user_id: Number(user_id),
                    delete_status: 0
                },
            });
            if (!userdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Does not exist user account!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        user_id: userdata.user_id,
                        user_name: userdata.user_name,
                        email: userdata.email,
                    }
                );
            }
        }
        catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else {
                this.logger.error("Error:" + err);
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindUserResponseDto[]> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const userdata = await this.prisma.user.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            return (
                userdata.map((a) => {
                    const userdto = new FindUserResponseDto();
                    userdto.user_name = a.user_name;
                    userdto.email = a.email;
                    return userdto;
                }));
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    async findUserByEmail(
        email: string,
    ): Promise<CheckUserResponseDto> {
        try {
            const userdata = await this.prisma.user.findUnique({
                where: { email: typeof email === "string" ? email : email },
            });
            if (!userdata.user_id) {
                throw new HttpException({
                    errorCode: "E1111",
                    errorMessage: "Does not exist user!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        user_id: userdata.user_id,
                        email: userdata.email,
                        password: userdata.password
                    }
                );
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            throw new HttpException({
                errorCode: "E1119",
                errorMessage: "Internal Server Error"
            },
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async createUser(data: CreateUserDto): Promise<FindUserResponseDto> {
        try {
            if (data?.password !== data?.confirm_password) {
                throw new HttpException({
                    errorCode: "E1116",
                    errorMessage: "Password and confirmpassword does not match!"
                },
                    HttpStatus.NOT_FOUND);
            }
            const restoreuserdata = await this.prisma.user.findUnique({
                where: { email: data.email, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your account have been deleted."
                },
                    HttpStatus.NOT_FOUND);
            }
            const userdata = await this.prisma.user.findUnique({
                where: { email: data.email, delete_status: 0 },
            });
            const userdto = new FindUserResponseDto();
            if (userdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {

                const ENC = jwtConstants.secret;
                const IV = jwtConstants.iv;
                const ALGO = jwtConstants.algo;
                const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
                let decryptedPassword = decipher.update(data.password, 'base64', 'utf8');
                decryptedPassword += decipher.final('utf8');

                const userresponse = await this.prisma.user.create({
                    data: {
                        user_name: data.user_name,
                        email: data.email,
                        password: decryptedPassword.toString(),
                        delete_status: 0,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                    },
                });
                userdto.user_id = userresponse.user_id,
                    userdto.user_name = userresponse.user_name,
                    userdto.email = userresponse.email
            }
            return userdto;
        }
        catch (err) {
            this.logger.error("Error:" + err);

            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<FindUserResponseDto> {
        const { where, data } = params;

        try {
            const userdata = await this.prisma.user.update({
                where,
                data: {
                    user_name: data.user_name,
                    email: data.email,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!userdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "User does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        user_id: userdata.user_id,
                        user_name: userdata.user_name,
                        email: userdata.email,
                    }
                );
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async changeUserPassword(
        email: string, data: ChangePasswordDto
    ): Promise<FindUserResponseDto> {
        const restoreuserdata = await this.prisma.user.findUnique({
            where: { email: email, delete_status: 0 },
        });
        if (restoreuserdata) {
            const ENC = jwtConstants.secret;
            const IV = jwtConstants.iv;
            const ALGO = jwtConstants.algo;
            const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
            let decryptedPassword = decipher.update(data.password, 'base64', 'utf8');
            decryptedPassword += decipher.final('utf8');

            if (decryptedPassword.toString() !== restoreuserdata.password) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Invalid Password"
                },
                    HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new HttpException({
                errorCode: "E1117",
                errorMessage: "User does not exist!"
            },
                HttpStatus.NOT_FOUND);
        }

        try {
            if (data?.new_password === data?.new_confirm_password) {
                const ENC = jwtConstants.secret;
                const IV = jwtConstants.iv;
                const ALGO = jwtConstants.algo;
                const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
                let decryptedPassword = decipher.update(data.new_password, 'base64', 'utf8');
                decryptedPassword += decipher.final('utf8');

                const userdata = await this.prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        password: decryptedPassword.toString(),
                        updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                    }
                });
                if (!userdata) {
                    throw new HttpException({
                        errorCode: "E1117",
                        errorMessage: "User account does not exist!"
                    },
                        HttpStatus.NOT_FOUND);
                }
                else {
                    return (
                        {
                            user_id: userdata.user_id,
                            user_name: userdata.user_name,
                            email: userdata.email,
                        }
                    );
                }
            }
            else {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "New Password and new confirmpassword does not match!"
                },
                    HttpStatus.NOT_FOUND);
            }


        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async restoreAccount(email: string, data: CreateUserDto): Promise<FindUserResponseDto> {
        try {
            if (data?.password !== data?.confirm_password) {
                throw new HttpException({
                    errorCode: "E1116",
                    errorMessage: "Password and confirmpassword does not match!"
                },
                    HttpStatus.NOT_FOUND);
            }
            const ENC = jwtConstants.secret;
            const IV = jwtConstants.iv;
            const ALGO = jwtConstants.algo;
            const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
            let decryptedPassword = decipher.update(data.password, 'base64', 'utf8');
            decryptedPassword += decipher.final('utf8');

            const userdata = await this.prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    email: data.email,
                    password: decryptedPassword.toString(),
                    delete_status: 0,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!userdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        user_id: userdata.user_id,
                        user_name: userdata.user_name,
                        email: userdata.email,
                    }
                );
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async deleteUser(userid: string): Promise<any> {
        try {
            const useraccount = await this.prisma.user.findUnique({
                where: { user_id: Number(userid), delete_status: 0 },
            });

            if (!useraccount) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }

            return await this.prisma.user.update({
                where: {
                    user_id: Number(userid)
                },
                data: {
                    delete_status: 1,
                    deleted_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}