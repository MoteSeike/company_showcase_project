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
exports.FindProjectResponseDto = exports.ProjectProperty = exports.FindProjectByUserIdResponseDto = exports.FindProjectRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindProjectRequestDto {
}
exports.FindProjectRequestDto = FindProjectRequestDto;
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Project Name Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Project Name is required."
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Project Name can not more than 70 digits."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectRequestDto.prototype, "project_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid User Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "User Id is required."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectRequestDto.prototype, "user_id", void 0);
class FindProjectByUserIdResponseDto {
}
exports.FindProjectByUserIdResponseDto = FindProjectByUserIdResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectByUserIdResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectByUserIdResponseDto.prototype, "user_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], FindProjectByUserIdResponseDto.prototype, "project_list", void 0);
class ProjectProperty {
}
exports.ProjectProperty = ProjectProperty;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProjectProperty.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProjectProperty.prototype, "project_name", void 0);
class FindProjectResponseDto {
}
exports.FindProjectResponseDto = FindProjectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindProjectResponseDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectResponseDto.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindProjectResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindProjectResponseDto.prototype, "user_name", void 0);
//# sourceMappingURL=findprojectlist.dto.js.map