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
var ProjectController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const auth_guard_1 = require("../auth/auth.guard");
const findprojectlist_dto_1 = require("./dto/findprojectlist.dto");
const swagger_1 = require("@nestjs/swagger");
const createproject_dto_1 = require("./dto/createproject.dto");
const updateproject_dto_1 = require("./dto/updateproject.dto");
let ProjectController = ProjectController_1 = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.logger = new common_1.Logger(ProjectController_1.name);
    }
    async findAllProjectByUserId(user_id) {
        return this.projectService.findAllProjectByUserId(user_id, {});
    }
    async findAllProject() {
        return this.projectService.findAllProject({});
    }
    async createProject(project) {
        return this.projectService.createProject(project);
    }
    async updateProject(project_id, project) {
        return this.projectService.updateProject({
            where: { project_id: Number(project_id) },
            data: project,
        });
    }
    async restoreProjectInfo(project_id, project) {
        return this.projectService.restoreProjectInfo({
            where: { project_id: Number(project_id) },
            data: project,
        });
    }
    async deleteFeature(project_id) {
        return this.projectService.deleteProject({ project_id: Number(project_id) });
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(':user_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findprojectlist_dto_1.FindProjectResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAllProjectByUserId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findprojectlist_dto_1.FindProjectResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAllProject", null);
__decorate([
    (0, common_1.Post)('register/projectinfo'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createproject_dto_1.CreateProjectDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createproject_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findprojectlist_dto_1.FindProjectRequestDto
    }),
    (0, common_1.Put)('update/projectinfo/:project_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('project_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateproject_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: findprojectlist_dto_1.FindProjectRequestDto
    }),
    (0, common_1.Put)('restore/projectinfo/:project_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('project_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateproject_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "restoreProjectInfo", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/projectinfo/:project_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteFeature", null);
exports.ProjectController = ProjectController = ProjectController_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map