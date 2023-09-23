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
var IssuseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuseController = void 0;
const common_1 = require("@nestjs/common");
const issuse_service_1 = require("./issuse.service");
const findissuse_dto_1 = require("./dto/findissuse.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const createissuse_dto_1 = require("./dto/createissuse.dto");
const updateissuse_dto_1 = require("./dto/updateissuse.dto");
let IssuseController = IssuseController_1 = class IssuseController {
    constructor(projectService) {
        this.projectService = projectService;
        this.logger = new common_1.Logger(IssuseController_1.name);
    }
    async findAllIssuseByProjectId(project_id) {
        return this.projectService.findAllIssuseByProjectId(project_id, {});
    }
    async findAllIssuse() {
        return this.projectService.findAllIssuse({});
    }
    async createIssuse(issuse) {
        return this.projectService.createIssuse(issuse);
    }
    async updateProject(issuse_id, issuse) {
        return this.projectService.updateIssuse({
            where: { issuse_id: Number(issuse_id) },
            data: issuse,
        });
    }
    async restoreProjectInfo(issuse_id, issuse) {
        return this.projectService.restoreIssuseInfo({
            where: { issuse_id: Number(issuse_id) },
            data: issuse,
        });
    }
    async deleteFeature(issuse_id) {
        return this.projectService.deleteIssuse({ issuse_id: Number(issuse_id) });
    }
};
exports.IssuseController = IssuseController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(':project_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findissuse_dto_1.FindIssuseResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "findAllIssuseByProjectId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findissuse_dto_1.FindIssuseResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "findAllIssuse", null);
__decorate([
    (0, common_1.Post)('register/issuseinfo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createissuse_dto_1.CreateIssuseDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createissuse_dto_1.CreateIssuseDto]),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "createIssuse", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findissuse_dto_1.FindIssuseResponseDto
    }),
    (0, common_1.Put)('update/issuseinfo/:issuse_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('issuse_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateissuse_dto_1.UpdateIssuseDto]),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findissuse_dto_1.FindIssuseResponseDto
    }),
    (0, common_1.Put)('restore/issuseinfo/:issuse_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('issuse_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateissuse_dto_1.UpdateIssuseDto]),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "restoreProjectInfo", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/issuseinfo/:issuse_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('issuse_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IssuseController.prototype, "deleteFeature", null);
exports.IssuseController = IssuseController = IssuseController_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/issuse'),
    __metadata("design:paramtypes", [issuse_service_1.IssuseService])
], IssuseController);
//# sourceMappingURL=issuse.controller.js.map