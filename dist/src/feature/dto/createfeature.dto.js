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
exports.CreateFeatureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFeatureDto {
}
exports.CreateFeatureDto = CreateFeatureDto;
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
], CreateFeatureDto.prototype, "feature_name", void 0);
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
    __metadata("design:type", Number)
], CreateFeatureDto.prototype, "price", void 0);
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
], CreateFeatureDto.prototype, "category_id", void 0);
//# sourceMappingURL=createfeature.dto.js.map