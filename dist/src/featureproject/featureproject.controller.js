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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureprojectController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const createfeatureproject_dto_1 = require("./dto/createfeatureproject.dto");
const featureproject_service_1 = require("./featureproject.service");
const updatefeatureproject_dto_1 = require("./dto/updatefeatureproject.dto");
let FeatureprojectController = class FeatureprojectController {
    constructor(featureProjectService) {
        this.featureProjectService = featureProjectService;
    }
    async createFeatureProject(featureproject) {
        return this.featureProjectService.createFeatureProject(featureproject);
    }
    async updateFeatureProject(feature_id, project_id, featureproject) {
        return this.featureProjectService.updateFeatureProject(feature_id, project_id, featureproject);
    }
    async restoreFeatureProject(feature_id, project_id, featureproject) {
        return this.featureProjectService.restoreFeatureProject(feature_id, project_id, featureproject);
    }
    async deleteFeature(feature_id, project_id) {
        return this.featureProjectService.deleteFeatureProject(feature_id, project_id);
    }
};
exports.FeatureprojectController = FeatureprojectController;
__decorate([
    (0, common_1.Post)('register/featureinfo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createfeatureproject_dto_1.CreateFeatureProjectDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createfeatureproject_dto_1.CreateFeatureProjectDto]),
    __metadata("design:returntype", Promise)
], FeatureprojectController.prototype, "createFeatureProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Put)('update/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, updatefeatureproject_dto_1.UpdateFeatureProjectDto]),
    __metadata("design:returntype", Promise)
], FeatureprojectController.prototype, "updateFeatureProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Put)('restore/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, updatefeatureproject_dto_1.UpdateFeatureProjectDto]),
    __metadata("design:returntype", Promise)
], FeatureprojectController.prototype, "restoreFeatureProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/featureinfo/:feature_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('feature_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FeatureprojectController.prototype, "deleteFeature", null);
exports.FeatureprojectController = FeatureprojectController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/featureproject'),
    __metadata("design:paramtypes", [featureproject_service_1.FeatureprojectService])
], FeatureprojectController);
//# sourceMappingURL=featureproject.controller.js.map