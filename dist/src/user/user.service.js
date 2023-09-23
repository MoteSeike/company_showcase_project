"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const finduser_dto_1 = require("./dto/finduser.dto");
const dayjs = require("dayjs");
const crypto = require("crypto");
const constant_1 = require("../auth/constant");
let UserService = UserService_1 = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async user(user_id) {
        try {
            const userdata = await this.prisma.user.findUnique({
                where: {
                    user_id: Number(user_id),
                    delete_status: 0
                },
            });
            if (!userdata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Does not exist user account!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    user_id: userdata.user_id,
                    user_name: userdata.user_name,
                    email: userdata.email,
                });
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                this.logger.error("Error:" + err);
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async users(params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const userdata = await this.prisma.user.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            return (userdata.map((a) => {
                const userdto = new finduser_dto_1.FindUserResponseDto();
                userdto.user_name = a.user_name;
                userdto.email = a.email;
                return userdto;
            }));
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async findUserByEmail(email) {
        try {
            const userdata = await this.prisma.user.findUnique({
                where: { email: typeof email === "string" ? email : email },
            });
            if (!userdata.user_id) {
                throw new common_1.HttpException({
                    errorCode: "E1111",
                    errorMessage: "Does not exist user!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    user_id: userdata.user_id,
                    email: userdata.email,
                    password: userdata.password
                });
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            throw new common_1.HttpException({
                errorCode: "E1119",
                errorMessage: "Internal Server Error"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(data) {
        try {
            if (data?.password !== data?.confirm_password) {
                throw new common_1.HttpException({
                    errorCode: "E1116",
                    errorMessage: "Password and confirmpassword does not match!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const restoreuserdata = await this.prisma.user.findUnique({
                where: { email: data.email, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your account have been deleted."
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const userdata = await this.prisma.user.findUnique({
                where: { email: data.email, delete_status: 0 },
            });
            const userdto = new finduser_dto_1.FindUserResponseDto();
            if (userdata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const ENC = constant_1.jwtConstants.secret;
                const IV = constant_1.jwtConstants.iv;
                const ALGO = constant_1.jwtConstants.algo;
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
                    userdto.email = userresponse.email;
            }
            return userdto;
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateUser(params) {
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
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "User does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    user_id: userdata.user_id,
                    user_name: userdata.user_name,
                    email: userdata.email,
                });
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async changeUserPassword(email, data) {
        const restoreuserdata = await this.prisma.user.findUnique({
            where: { email: email, delete_status: 0 },
        });
        if (restoreuserdata) {
            const ENC = constant_1.jwtConstants.secret;
            const IV = constant_1.jwtConstants.iv;
            const ALGO = constant_1.jwtConstants.algo;
            const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
            let decryptedPassword = decipher.update(data.password, 'base64', 'utf8');
            decryptedPassword += decipher.final('utf8');
            if (decryptedPassword.toString() !== restoreuserdata.password) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Invalid Password"
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException({
                errorCode: "E1117",
                errorMessage: "User does not exist!"
            }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            if (data?.new_password === data?.new_confirm_password) {
                const ENC = constant_1.jwtConstants.secret;
                const IV = constant_1.jwtConstants.iv;
                const ALGO = constant_1.jwtConstants.algo;
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
                    throw new common_1.HttpException({
                        errorCode: "E1117",
                        errorMessage: "User account does not exist!"
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                else {
                    return ({
                        user_id: userdata.user_id,
                        user_name: userdata.user_name,
                        email: userdata.email,
                    });
                }
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "New Password and new confirmpassword does not match!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async restoreAccount(email, data) {
        try {
            if (data?.password !== data?.confirm_password) {
                throw new common_1.HttpException({
                    errorCode: "E1116",
                    errorMessage: "Password and confirmpassword does not match!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const ENC = constant_1.jwtConstants.secret;
            const IV = constant_1.jwtConstants.iv;
            const ALGO = constant_1.jwtConstants.algo;
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
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    user_id: userdata.user_id,
                    user_name: userdata.user_name,
                    email: userdata.email,
                });
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deleteUser(userid) {
        try {
            const useraccount = await this.prisma.user.findUnique({
                where: { user_id: Number(userid), delete_status: 0 },
            });
            if (!useraccount) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "User account does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
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
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            else {
                throw new common_1.HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map