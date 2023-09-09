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
exports.UpdateIssuseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateIssuseDto {
}
exports.UpdateIssuseDto = UpdateIssuseDto;
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Issuse Info Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Issuse Info is required."
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Issuse Info can not more than 70 digits."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateIssuseDto.prototype, "issuse_info", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Status Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "Status is required."
        },
    }),
    (0, class_validator_1.MaxLength)(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Status can not more than 70 digits."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateIssuseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid User Id Format."
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: {
            errorCode: "E1000",
            errorMessage: "User Id is required."
        },
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateIssuseDto.prototype, "user_id", void 0);
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
], UpdateIssuseDto.prototype, "project_id", void 0);
//# sourceMappingURL=updateissuse.dto.js.map