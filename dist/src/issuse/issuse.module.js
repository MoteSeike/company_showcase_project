"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuseModule = void 0;
const common_1 = require("@nestjs/common");
const issuse_controller_1 = require("./issuse.controller");
const issuse_service_1 = require("./issuse.service");
const prisma_service_1 = require("../prisma/prisma.service");
let IssuseModule = class IssuseModule {
};
exports.IssuseModule = IssuseModule;
exports.IssuseModule = IssuseModule = __decorate([
    (0, common_1.Module)({
        controllers: [issuse_controller_1.IssuseController],
        providers: [issuse_service_1.IssuseService, prisma_service_1.PrismaService],
        exports: [issuse_service_1.IssuseService]
    })
], IssuseModule);
//# sourceMappingURL=issuse.module.js.map