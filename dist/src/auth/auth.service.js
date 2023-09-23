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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const crypto = require("crypto");
const constant_1 = require("./constant");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signIn(email, pass) {
        const user = await this.usersService.findUserByEmail(email);
        if (user === null) {
            throw new common_1.UnauthorizedException({
                errorCode: 'E1111',
                errorMessage: 'Unauthorized user.'
            });
        }
        const ENC = constant_1.jwtConstants.secret;
        const IV = constant_1.jwtConstants.iv;
        const ALGO = constant_1.jwtConstants.algo;
        const decipher = crypto.createDecipheriv(ALGO, ENC, IV);
        let decryptedPassword = decipher.update(pass, 'base64', 'utf8');
        decryptedPassword += decipher.final('utf8');
        if (decryptedPassword.toString() !== user?.password) {
            throw new common_1.UnauthorizedException({
                errorCode: 'E1116',
                errorMessage: 'Invalid Password.'
            });
        }
        const payload = { email: user.email, sub: user.user_id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotAcceptableException({
                errorCode: 'E1118',
                errorMessage: 'Unacceptable exception.'
            });
        }
        if (user && (password === user.password)) {
            return {
                user_id: user.email,
                user_name: user.user_id
            };
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map