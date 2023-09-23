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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const public_1 = require("../auth/public");
const swagger_1 = require("@nestjs/swagger");
const createuser_dto_1 = require("./dto/createuser.dto");
const updateuser_dto_1 = require("./dto/updateuser.dto");
const finduser_dto_1 = require("./dto/finduser.dto");
const changepassword_dto_1 = require("./dto/changepassword.dto");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async findUserOne(user_id) {
        return this.userService.user(user_id);
    }
    async findUserAll() {
        return this.userService.users({});
    }
    async createUser(user) {
        return this.userService.createUser(user);
    }
    async updateUser(userId, user) {
        return this.userService.updateUser({
            where: { user_id: Number(userId) },
            data: user,
        });
    }
    async changeUserPassword(email, user) {
        return this.userService.changeUserPassword(email, user);
    }
    async restoreUserAccount(email, user) {
        const data = this.userService.restoreAccount(email, user);
        if (data) {
            return true;
        }
        return false;
    }
    async deleteUser(user_id) {
        return this.userService.deleteUser(user_id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(':user_id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: finduser_dto_1.FindUserResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserOne", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: finduser_dto_1.FindUserResponseDto
    }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserAll", null);
__decorate([
    (0, common_1.Post)('register/userinfo'),
    (0, public_1.Public)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: createuser_dto_1.CreateUserDto
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createuser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: finduser_dto_1.FindUserResponseDto
    }),
    (0, common_1.Put)('update/userinfo/:user_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateuser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('changepassword/:email'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, changepassword_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserPassword", null);
__decorate([
    (0, common_1.Put)('restoreaccount/:email'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createuser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "restoreUserAccount", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuards),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
    }),
    (0, common_1.Delete)('delete/useraccount/:user_id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/v1/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map