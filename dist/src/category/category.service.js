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
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const findcategory_dto_1 = require("./dto/findcategory.dto");
const dayjs = require("dayjs");
let CategoryService = CategoryService_1 = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CategoryService_1.name);
    }
    async findCaregory(category_id) {
        try {
            const categorydata = await this.prisma.category.findUnique({
                where: {
                    category_id: Number(category_id),
                    delete_status: 0
                },
            });
            if (!categorydata) {
                throw new common_1.HttpException({
                    errorCode: "E1111",
                    errorMessage: "Does not exist category!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    category_id: categorydata.category_id,
                    category_name: categorydata.category_name
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
    async findAllCategory(params) {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const categorydata = await this.prisma.category.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            return (categorydata.map((a) => {
                const categorydto = new findcategory_dto_1.FindCategoryResponseDto();
                categorydto.category_id = a.category_id;
                categorydto.category_name = a.category_name;
                return categorydto;
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
    async createCategory(data) {
        try {
            const categorydata = await this.prisma.category.findUnique({
                where: { category_name: data.category_name },
            });
            const restoreuserdata = await this.prisma.category.findUnique({
                where: { category_name: data.category_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new common_1.HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your category info have been deleted."
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const categorydto = new findcategory_dto_1.FindCategoryResponseDto();
            if (categorydata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Info already exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const categoryresponse = await this.prisma.category.create({
                    data: {
                        category_name: data.category_name,
                        delete_status: 0,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                    },
                });
                categorydto.category_id = categoryresponse.category_id,
                    categorydto.category_name = categoryresponse.category_name;
                return categorydto;
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
    async updateCategory(params) {
        const { where, data } = params;
        try {
            const categorydata = await this.prisma.category.update({
                where,
                data: {
                    category_name: data.category_name,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!categorydata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Name does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    category_id: categorydata.category_id,
                    category_name: categorydata.category_name,
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
    async restoreCategoryInfo(params) {
        const { where, data } = params;
        try {
            const categorydata = await this.prisma.category.update({
                where,
                data: {
                    category_name: data.category_name,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!categorydata) {
                throw new common_1.HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Info does not exist!"
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                return ({
                    category_id: categorydata.category_id,
                    category_name: categorydata.category_name,
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
    async deleteCategory(where) {
        try {
            return await this.prisma.category.update({
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
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map