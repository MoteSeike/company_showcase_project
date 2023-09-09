"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ValidatePipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOnlyOne = exports.ValidatePipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ValidatePipe = ValidatePipe_1 = class ValidatePipe {
    constructor() {
        this.logger = new common_1.Logger(ValidatePipe_1.name);
    }
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype))
            return value;
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            if (errors[0].contexts) {
                Object.keys(errors[0].contexts).map((key) => {
                    const errorResponse = errors[0].contexts[key];
                    throw new common_1.BadRequestException(errorResponse);
                });
            }
            else if (errors[0]?.children[0]?.children[0]?.contexts) {
                Object.keys(errors[0]?.children[0]?.children[0]?.contexts).map((key) => {
                    const errorResponse = errors[0]?.children[0]?.children[0]?.contexts[key];
                    throw new common_1.BadRequestException(errorResponse);
                });
            }
            else {
                const errorResponse = {
                    errorCode: 'E1999',
                    errorMessage: 'Internal Server Error'
                };
                throw new common_1.BadRequestException(errorResponse);
            }
        }
        return object;
    }
    toValidate(metatype) {
        const type = [Boolean, String, Number, Array, Object];
        return !type.includes(metatype);
    }
};
exports.ValidatePipe = ValidatePipe;
exports.ValidatePipe = ValidatePipe = ValidatePipe_1 = __decorate([
    (0, common_1.Injectable)()
], ValidatePipe);
function IsOnlyOne(property, validateOption) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsOnlyOne',
        constraints: [property],
        validator: {
            validate(value, args) {
                const [relatedPropertyName] = args.constraints;
                const relatedValue = args.object[relatedPropertyName];
                if (!value && !relatedValue)
                    return false;
                else if (!value && !relatedValue)
                    return false;
                return true;
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + 'hello', validateOption),
        },
    }, validateOption);
}
exports.IsOnlyOne = IsOnlyOne;
//# sourceMappingURL=ValidatePipe.js.map