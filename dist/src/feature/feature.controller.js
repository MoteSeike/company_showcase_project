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
var FeatureController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureController = void 0;
const common_1 = require("@nestjs/common");
const feature_service_1 = require("./feature.service");
const auth_guard_1 = require("../auth/auth.guard");
const findfeature_dto_1 = require("./dto/findfeature.dto");
const swagger_1 = require("@nestjs/swagger");
const createfeature_dto_1 = require("./dto/createfeature.dto");
const updatefeature_dto_1 = require("./dto/updatefeature.dto");
let FeatureController = FeatureController_1 = class FeatureController {
    constructor(featureService) {
        this.featureService = featureService;
        this.logger = new common_1.Logger(FeatureController_1.name);
    }
    async findAllFeature(category_id) {
        return this.featureService.findAllFeature(category_id, {});
    }
    async createCategory(feature) {
        return this.featureService.createFeature(feature);
    }
    async updateFeature(feature_id, feature) {
        return this.featureService.updateFeature({
            where: { feature_id: Number(feature_id) },
            data: feature,
        });
    }
    async restoreFeatureInfo(feature_id, feature) {
        return this.featureService.restoreFeatureInfo({
            where: { feature_id: Number(feature_id) },
            data: feature,
        });
    }
    async deleteFeature(feature_id) {
        return this.featureService.deleteFeature({ feature_id: Number(feature_id) });
    }
};
exports.FeatureController = FeatureController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(':category_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findfeature_dto_1.FindFeatureResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "findAllFeature", null);
__decorate([
    (0, common_1.Post)('register/featureinfo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createfeature_dto_1.CreateFeatureDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createfeature_dto_1.CreateFeatureDto]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findfeature_dto_1.FindFeatureResponseDto
    }),
    (0, common_1.Put)('update/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatefeature_dto_1.UpdateFeatureDto]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "updateFeature", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findfeature_dto_1.FindFeatureResponseDto
    }),
    (0, common_1.Put)('restore/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatefeature_dto_1.UpdateFeatureDto]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "restoreFeatureInfo", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "deleteFeature", null);
exports.FeatureController = FeatureController = FeatureController_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/feature'),
    __metadata("design:paramtypes", [feature_service_1.FeatureService])
], FeatureController);
//# sourceMappingURL=feature.controller.js.map