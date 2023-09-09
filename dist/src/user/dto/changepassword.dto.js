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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Password is required."
        },
    }),
    (0, class_validator_1.MinLength)(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "Password must be at least 10 digits"
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Password can not more than 70 digits"
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "New Password is required."
        },
    }),
    (0, class_validator_1.MinLength)(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Password must be at least 10 digits"
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Password can not more than 70 digits"
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "new_password", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "New Confirm Password is required."
        },
    }),
    (0, class_validator_1.MinLength)(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Confirm Password must be at least 10 digits"
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Confirm Password can not more than 70 digits"
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "new_confirm_password", void 0);
//# sourceMappingURL=changepassword.dto.js.map