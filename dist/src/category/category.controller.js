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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CategoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const findcategory_dto_1 = require("./dto/findcategory.dto");
const createcategory_dto_1 = require("./dto/createcategory.dto");
const updatecategory_dto_1 = require("./dto/updatecategory.dto");
let CategoryController = CategoryController_1 = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.logger = new common_1.Logger(CategoryController_1.name);
    }
    async findCategoryOne(category_id) {
        return this.categoryService.findCaregory(category_id);
    }
    async findAllCategory() {
        return this.categoryService.findAllCategory({});
    }
    async createCategory(category) {
        return this.categoryService.createCategory(category);
    }
    async updateCategory(category_id, category) {
        return this.categoryService.updateCategory({
            where: { category_id: Number(category_id) },
            data: category,
        });
    }
    async restoreCategoryInfo(category_id, category) {
        return this.categoryService.restoreCategoryInfo({
            where: { category_id: Number(category_id) },
            data: category,
        });
    }
    async deleteCategory(category_id) {
        return this.categoryService.deleteCategory({ category_id: Number(category_id) });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(':category_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findcategory_dto_1.FindCategoryResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findCategoryOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findcategory_dto_1.FindCategoryResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllCategory", null);
__decorate([
    (0, common_1.Post)('register/categoryinfo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createcategory_dto_1.CreateCategoryDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createcategory_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findcategory_dto_1.FindCategoryResponseDto
    }),
    (0, common_1.Put)('update/categoryinfo/:category_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('category_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatecategory_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findcategory_dto_1.FindCategoryResponseDto
    }),
    (0, common_1.Put)('update/categoryinfo/:category_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('category_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatecategory_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "restoreCategoryInfo", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/categoryinfo/:category_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = CategoryController_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map