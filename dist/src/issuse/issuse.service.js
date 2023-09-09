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
var IssuseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const findissuse_dto_1 = require("./dto/findissuse.dto");
const dayjs_1 = require("dayjs");
const swagger_1 = require("@nestjs/swagger");
let IssuseService = IssuseService_1 = class IssuseService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(IssuseService_1.name);
    }
    async findAllIssuseByProjectId(project_id, params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const issusedata = await this.prisma.issue.findMany({
                where: {
                    project_id: Number(project_id)
                },
                skip,
                take,
                cursor,
                orderBy,
            });
            const responseissusedto = issusedata.map((a) => {
                const issusedto = new findissuse_dto_1.IssuseProperty();
                issusedto.issuse_id = a.issuse_id;
                issusedto.issuse_info = a.issuse_info;
                issusedto.status = a.status;
                issusedto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => issusedto.user_name = res);
                return issusedto;
            });
            const projectdata = await this.prisma.project.findUnique({
                where: {
                    project_id: Number(project_id),
                    delete_status: 0
                },
            });
            const responsedata = new findissuse_dto_1.FindIssuseResponseByProjectIdDto;
            responsedata.project_id = project_id,
                responsedata.project_name = projectdata.project_name,
                responsedata.issuse_list = responseissusedto;
            return responsedata;
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
    async getUserData(user_id) {
        const userdata = await this.prisma.user.findUnique({
            where: {
                user_id: Number(user_id),
                delete_status: 0
            },
        });
        return userdata.user_name;
    }
    async getProjectData(project_id) {
        const projectdata = await this.prisma.project.findUnique({
            where: {
                project_id: Number(project_id),
                delete_status: 0
            },
        });
        return projectdata.project_name;
    }
    async findAllIssuse(params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const issusedata = await this.prisma.issue.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            const responseissusedto = issusedata.map((a) => {
                const issusedto = new findissuse_dto_1.FindIssuseResponseDto();
                issusedto.issuse_id = a.issuse_id;
                issusedto.issuse_info = a.issuse_info;
                issusedto.status = a.status;
                issusedto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => issusedto.user_name = res);
                issusedto.project_id = a.project_id;
                this.getProjectData(a.project_id).then(res => issusedto.project_name = res);
                return issusedto;
            });
            return responseissusedto;
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
    async createIssuse(data) {
        try {
            const issusedata = await this.prisma.issue.findUnique({
                where: { issuse_info: data.issuse_info },
            });
            const restoreuserdata = await this.prisma.issue.findUnique({
                where: { issuse_info: data.issuse_info, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your issuse info have been deleted."
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const issusedto = new findissuse_dto_1.FindIssuseResponseDto;
            if (issusedata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const issuseresponse = await this.prisma.issue.create({
                    data: {
                        issuse_info: data.issuse_info,
                        delete_status: 0,
                        status: data.status,
                        registration_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                        user_id: Number(data.user_id),
                        project_id: Number(data.project_id)
                    },
                });
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issuseresponse.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issuseresponse.project_id),
                        delete_status: 0
                    },
                });
                issusedto.issuse_id = issuseresponse.issuse_id,
                    issusedto.project_id = issuseresponse.project_id,
                    issusedto.issuse_info = issuseresponse.issuse_info,
                    issusedto.status = issuseresponse.status,
                    issusedto.user_id = issuseresponse.user_id,
                    issusedto.user_name = userdata.user_name,
                    issusedto.project_id = issuseresponse.project_id,
                    issusedto.project_name = projectdata.project_name;
                return issusedto;
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
    async updateIssuse(params) {
        const { where, data } = params;
        try {
            const issusedata = await this.prisma.issue.update({
                where,
                data: {
                    issuse_info: data.issuse_info,
                    delete_status: 0,
                    status: data.status,
                    updated_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id),
                    project_id: Number(data.project_id)
                }
            });
            if (!issusedata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issusedata.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issusedata.project_id),
                        delete_status: 0
                    },
                });
                return ({
                    issuse_id: issusedata.issuse_id,
                    project_id: issusedata.project_id,
                    project_name: projectdata.project_name,
                    issuse_info: issusedata.issuse_info,
                    status: issusedata.status,
                    user_id: issusedata.user_id,
                    user_name: userdata.user_name
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
    async restoreIssuseInfo(params) {
        const { where, data } = params;
        try {
            const issusedata = await this.prisma.issue.update({
                where,
                data: {
                    issuse_info: data.issuse_info,
                    delete_status: 0,
                    status: data.status,
                    updated_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id),
                    project_id: Number(data.project_id)
                }
            });
            if (!issusedata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issusedata.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issusedata.project_id),
                        delete_status: 0
                    },
                });
                return ({
                    issuse_id: issusedata.issuse_id,
                    project_id: issusedata.project_id,
                    project_name: projectdata.project_name,
                    issuse_info: issusedata.issuse_info,
                    status: issusedata.status,
                    user_id: issusedata.user_id,
                    user_name: userdata.user_name
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
    async deleteIssuse(where) {
        try {
            return await this.prisma.issue.update({
                where,
                data: {
                    delete_status: 1,
                    deleted_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss'))
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
exports.IssuseService = IssuseService;
exports.IssuseService = IssuseService = IssuseService_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IssuseService);
//# sourceMappingURL=issuse.service.js.map