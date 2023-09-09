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
var FeatureprojectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureprojectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const createfeatureproject_dto_1 = require("./dto/createfeatureproject.dto");
const updatefeatureproject_dto_1 = require("./dto/updatefeatureproject.dto");
let FeatureprojectService = FeatureprojectService_1 = class FeatureprojectService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FeatureprojectService_1.name);
    }
    async createFeatureProject(data) {
        try {
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: data.feature_id,
                    project_id: data.project_id,
                    delete_status: 0
                },
            });
            const restorefeaturedata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: data.feature_id,
                    project_id: data.project_id,
                    delete_status: 1
                },
            });
            if (restorefeaturedata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your Feature Project Info have been deleted!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const featuredto = new createfeatureproject_dto_1.CreateFeatureProjectResponseDto();
            if (featuredata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Project already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const featureresponse = await this.prisma.featureProject.create({
                    data: {
                        feature_id: data.feature_id,
                        delete_status: 0,
                        project_id: data.project_id,
                    },
                });
                featuredto.feature_id = featureresponse.feature_id,
                    featuredto.project_id = featureresponse.project_id;
                return featuredto;
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
    async updateFeatureProject(feature_id, project_id, data) {
        try {
            const featuredto = new updatefeatureproject_dto_1.UpdateFeatureProjectResponseDto();
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            const featureresponse = await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    feature_id: data.feature_id,
                    delete_status: 0,
                    project_id: data.project_id,
                },
            });
            featuredto.feature_id = featureresponse.feature_id,
                featuredto.project_id = featureresponse.project_id;
            return featuredto;
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
    async restoreFeatureProject(feature_id, project_id, data) {
        try {
            const featuredto = new updatefeatureproject_dto_1.UpdateFeatureProjectResponseDto();
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            const featureresponse = await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    feature_id: data.feature_id,
                    delete_status: 0,
                    project_id: data.project_id,
                },
            });
            featuredto.feature_id = featureresponse.feature_id,
                featuredto.project_id = featureresponse.project_id;
            return featuredto;
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
    async deleteFeatureProject(feature_id, project_id) {
        try {
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            return await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    delete_status: 1,
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
exports.FeatureprojectService = FeatureprojectService;
exports.FeatureprojectService = FeatureprojectService = FeatureprojectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeatureprojectService);
//# sourceMappingURL=featureproject.service.js.map