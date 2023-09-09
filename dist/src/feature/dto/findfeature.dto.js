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
exports.FeatureProperty = exports.FindFeatureResponseDto = exports.FindFeatureRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindFeatureRequestDto {
}
exports.FindFeatureRequestDto = FindFeatureRequestDto;
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Feature Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Name is required."
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Name can not more than 70 digits."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindFeatureRequestDto.prototype, "feature_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Price Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Price is required."
        },
    }),
    (0, class_validator_1.MinLength)(0, {
        context: {
            errorCode: "E1000",
            errorMessage: "Price must be at least 1 digit."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindFeatureRequestDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Category Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Category Id is required."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindFeatureRequestDto.prototype, "category_id", void 0);
class FindFeatureResponseDto {
}
exports.FindFeatureResponseDto = FindFeatureResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindFeatureResponseDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindFeatureResponseDto.prototype, "category_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], FindFeatureResponseDto.prototype, "feature_list", void 0);
class FeatureProperty {
}
exports.FeatureProperty = FeatureProperty;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FeatureProperty.prototype, "feature_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeatureProperty.prototype, "feature_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FeatureProperty.prototype, "price", void 0);
//# sourceMappingURL=findfeature.dto.js.map