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
var FeatureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const findfeature_dto_1 = require("./dto/findfeature.dto");
const dayjs_1 = require("dayjs");
let FeatureService = FeatureService_1 = class FeatureService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FeatureService_1.name);
    }
    async findAllFeature(category_id, params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const featuredata = await this.prisma.feature.findMany({
                where: {
                    category_id: Number(category_id)
                },
                skip,
                take,
                cursor,
                orderBy,
            });
            const responsefeaturedto = featuredata.map((a) => {
                const featuredto = new findfeature_dto_1.FeatureProperty();
                featuredto.feature_id = a.feature_id;
                featuredto.feature_name = a.feature_name;
                return featuredto;
            });
            const categorydata = await this.prisma.category.findUnique({
                where: {
                    category_id: Number(category_id),
                    delete_status: 0
                },
            });
            const responsedata = new findfeature_dto_1.FindFeatureResponseDto;
            responsedata.category_id = category_id,
                responsedata.category_name = categorydata.category_name,
                responsedata.feature_list = responsefeaturedto;
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
    async createFeature(data) {
        try {
            const featuredata = await this.prisma.feature.findUnique({
                where: { feature_name: data.feature_name },
            });
            const restoreuserdata = await this.prisma.feature.findUnique({
                where: { feature_name: data.feature_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your feature info have been deleted."
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const featuredto = new findfeature_dto_1.FindFeatureResponseDto();
            if (featuredata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const featureresponse = await this.prisma.feature.create({
                    data: {
                        feature_name: data.feature_name,
                        delete_status: 0,
                        price: data.price,
                        registration_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                        category_id: Number(data.category_id)
                    },
                });
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featureresponse.category_id),
                        delete_status: 0
                    },
                });
                featuredto.category_id = featureresponse.category_id,
                    featuredto.category_name = categorydata.category_name,
                    featuredto.feature_list = [
                        {
                            "feature_id": featureresponse.feature_id,
                            "feature_name": featureresponse.feature_name,
                            "price": Number(featureresponse.price)
                        }
                    ];
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
    async updateFeature(params) {
        const { where, data } = params;
        try {
            const featuredata = await this.prisma.feature.update({
                where,
                data: {
                    feature_name: data.feature_name,
                    delete_status: 0,
                    price: data.price,
                    updated_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    category_id: Number(data.category_id)
                }
            });
            if (!featuredata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Name does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featuredata.category_id),
                        delete_status: 0
                    },
                });
                return ({
                    category_id: featuredata.category_id,
                    category_name: categorydata.category_name,
                    feature_list: [
                        {
                            "feature_id": featuredata.feature_id,
                            "feature_name": featuredata.feature_name,
                            "price": Number(featuredata.price)
                        }
                    ]
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
    async restoreFeatureInfo(params) {
        const { where, data } = params;
        try {
            const featuredata = await this.prisma.feature.update({
                where,
                data: {
                    feature_name: data.feature_name,
                    delete_status: 0,
                    price: data.price,
                    updated_date: new Date((0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    category_id: Number(data.category_id)
                }
            });
            if (!featuredata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Name does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featuredata.category_id),
                        delete_status: 0
                    },
                });
                return ({
                    category_id: featuredata.category_id,
                    category_name: featuredata.feature_name,
                    feature_list: [
                        {
                            "feature_id": featuredata.feature_id,
                            "feature_name": featuredata.feature_name,
                            "price": Number(featuredata.price)
                        }
                    ]
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
    async deleteFeature(where) {
        try {
            return await this.prisma.feature.update({
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
exports.FeatureService = FeatureService;
exports.FeatureService = FeatureService = FeatureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeatureService);
//# sourceMappingURL=feature.service.js.map