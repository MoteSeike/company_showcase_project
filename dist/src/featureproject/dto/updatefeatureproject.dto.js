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
exports.UpdateFeatureProjectResponseDto = exports.UpdateFeatureProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateFeatureProjectDto {
}
exports.UpdateFeatureProjectDto = UpdateFeatureProjectDto;
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Feature Id Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Id is required."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateFeatureProjectDto.prototype, "feature_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Project Id Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Project Id is required."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateFeatureProjectDto.prototype, "project_id", void 0);
class UpdateFeatureProjectResponseDto {
}
exports.UpdateFeatureProjectResponseDto = UpdateFeatureProjectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateFeatureProjectResponseDto.prototype, "feature_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateFeatureProjectResponseDto.prototype, "project_id", void 0);
//# sourceMappingURL=updatefeatureproject.dto.js.map