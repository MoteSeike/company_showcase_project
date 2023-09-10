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
var ProjectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const findprojectlist_dto_1 = require("./dto/findprojectlist.dto");
const dayjs = require("dayjs");
let ProjectService = ProjectService_1 = class ProjectService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProjectService_1.name);
    }
    async findAllProjectByUserId(user_id, params) {
        const { skip, take, cursor, orderBy } = params;
        try {
            const userdata = await this.prisma.user.findUnique({
                where: {
                    user_id: Number(user_id),
                    delete_status: 0
                },
            });
            const projectdata = await this.prisma.project.findMany({
                where: {
                    user_id: Number(user_id)
                },
                skip,
                take,
                cursor,
                orderBy,
            });
            const responseprojectdto = projectdata.map((a) => {
                const projectdto = new findprojectlist_dto_1.ProjectProperty();
                projectdto.project_id = a.project_id;
                projectdto.project_name = a.project_name;
                return projectdto;
            });
            const responsedata = new findprojectlist_dto_1.FindProjectByUserIdResponseDto;
            responsedata.user_id = user_id,
                responsedata.user_name = userdata.user_name,
                responsedata.project_list = responseprojectdto;
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
    async findAllProject(params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const projectdata = await this.prisma.project.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            const responseprojectdto = projectdata.map((a) => {
                const projectdto = new findprojectlist_dto_1.FindProjectResponseDto();
                projectdto.project_id = a.project_id;
                projectdto.project_name = a.project_name;
                projectdto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => projectdto.project_name = res);
                return projectdto;
            });
            return responseprojectdto;
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
    async createProject(data) {
        try {
            const projectdata = await this.prisma.project.findUnique({
                where: { project_name: data.project_name },
            });
            const restoreuserdata = await this.prisma.project.findUnique({
                where: { project_name: data.project_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your project info have been deleted."
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const projectdto = new findprojectlist_dto_1.FindProjectResponseDto();
            if (projectdata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const projectresponse = await this.prisma.project.create({
                    data: {
                        project_name: data.project_name,
                        delete_status: 0,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                        user_id: Number(data.user_id)
                    },
                });
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectresponse.user_id),
                        delete_status: 0
                    },
                });
                projectdto.user_id = projectresponse.user_id,
                    projectdto.user_name = userdata.user_name,
                    projectdto.project_id = projectresponse.project_id,
                    projectdto.project_name = projectresponse.project_name;
                return projectdto;
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
    async updateProject(params) {
        const { where, data } = params;
        try {
            const projectdata = await this.prisma.project.update({
                where,
                data: {
                    project_name: data.project_name,
                    delete_status: 0,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id)
                }
            });
            if (!projectdata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectdata.user_id),
                        delete_status: 0
                    },
                });
                return ({
                    user_id: projectdata.user_id,
                    user_name: userdata.user_name,
                    project_id: projectdata.project_id,
                    project_name: projectdata.project_name
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
    async restoreProjectInfo(params) {
        const { where, data } = params;
        try {
            const projectdata = await this.prisma.project.update({
                where,
                data: {
                    project_name: data.project_name,
                    delete_status: 0,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id)
                }
            });
            if (!projectdata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectdata.user_id),
                        delete_status: 0
                    },
                });
                return ({
                    user_id: projectdata.user_id,
                    user_name: userdata.user_name,
                    project_id: projectdata.project_id,
                    project_name: projectdata.project_name
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
    async deleteProject(where) {
        try {
            return await this.prisma.project.update({
                where,
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
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = ProjectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map